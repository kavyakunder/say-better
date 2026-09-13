import type { FeedbackResult, FeedbackScore } from "../types";

function escapeHtml(str: string): string {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function inlineMd(text: string): string {
  const escaped = escapeHtml(text);
  return escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

// Minimal markdown -> HTML: ## headers, - bullets, **bold**, paragraphs.
function markdownToHtml(md: string): string {
  const lines = md.split("\n");
  let html = "";
  let inList = false;

  const closeList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      closeList();
      return;
    }
    if (trimmed.startsWith("## ")) {
      closeList();
      html += `<h3>${inlineMd(trimmed.slice(3))}</h3>`;
    } else if (trimmed.startsWith("- ")) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${inlineMd(trimmed.slice(2))}</li>`;
    } else {
      closeList();
      html += `<p>${inlineMd(trimmed)}</p>`;
    }
  });
  closeList();
  return html;
}

// Parses Claude's structured reply:
//   SCORES: Clarity=7, Structure=6, ...
//   ## Strengths
//   - ...
export function parseFeedback(raw: string): any {
  const scoreMatch = raw.match(/SCORES:\s*(.+)/i);
  let scores: FeedbackScore[] = [];
  let bodyText = raw;

  if (scoreMatch) {
    const pairs = [...scoreMatch[1].matchAll(/([A-Za-z ]+?)\s*=\s*(\d+)/g)];
    scores = pairs.map(([, label, value]) => ({
      label: label.trim(),
      value: Number(value),
    }));
    bodyText = raw.slice((scoreMatch.index ?? 0) + scoreMatch[0].length);
  }

  return { scores, bodyHtml: markdownToHtml(bodyText) };
}
