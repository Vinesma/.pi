/**
 * Desktop notification extension.
 *
 * Sends a desktop notification via `notify-send` (dunst, etc.) when Pi
 * finishes a run and is ready for input again. Uses the `agent_settled`
 * event, which fires after the full run settles (retries, compaction,
 * and queued follow-ups already processed), so the notification only
 * appears when Pi truly needs your attention.
 *
 * Place this file in ~/.pi/agent/extensions/ and reload.
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { execFile } from "node:child_process";

const COOLDOWN_MS = 3 * 60 * 1000; // minimum gap between notifications
let lastNotifiedAt = 0;

function notify(title: string, body: string): void {
  // notify-send is async and fire-and-forget; ignore errors (e.g. no DISPLAY).
  execFile("notify-send", ["pi", body], { timeout: 5000 }, () => {});
}

export default function (pi: ExtensionAPI) {
  pi.on("agent_settled", async () => {
    const now = Date.now();
    if (now - lastNotifiedAt >= COOLDOWN_MS) {
      lastNotifiedAt = now;
      notify("Pi", "Ready for input");
    }
  });
}
