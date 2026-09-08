import { jsPDF } from "jspdf";

/*
 * One-page "Action Checklist" PDF — a shortened version of the eight Take Action
 * steps, sized to fit on a single Letter page. Generated with jsPDF (already a
 * dependency). Kept intentionally short so it never spills onto a second page.
 */

const STEPS: { title: string; body: string }[] = [
  { title: "Create your proposal", body: "Sketch a design, choose your Elements, and estimate the space and cost." },
  { title: "Understand the street", body: "Learn who controls the curb and how it is used today." },
  { title: "Talk to the people affected", body: "Ask neighbors and businesses what is working and what is missing." },
  { title: "Find the decision-maker", body: "Identify who can approve the change — often the city transportation department." },
  { title: "Build support", body: "Turn it into a clear one-page proposal with signatures and precedents." },
  { title: "Test the idea", body: "Try a temporary demonstration or a pilot before anything permanent." },
  { title: "Figure out who pays", body: "Match funding to one-time construction versus ongoing upkeep." },
  { title: "Move toward implementation", body: "Line up the design, approvals, funding, and a maintenance plan." },
];

/** Builds the checklist document (shared by the download button and tests). */
export function buildActionChecklistDoc(): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 56;
  let y = 68;

  // ── Header ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text("PARKING, REIMAGINED", M, y);
  y += 28;
  doc.setFontSize(26);
  doc.setTextColor(30);
  doc.text("Action Checklist", M, y);
  y += 20;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(110);
  doc.text("Turn your design into a real street project.", M, y);
  y += 22;

  doc.setDrawColor(215);
  doc.setLineWidth(1);
  doc.line(M, y, W - M, y);
  y += 30;

  // ── Steps ──
  const box = 12;
  const textX = M + box + 14;
  STEPS.forEach((s, i) => {
    doc.setDrawColor(120);
    doc.setLineWidth(1.2);
    doc.rect(M, y - box + 2, box, box);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(30);
    doc.text(`${i + 1}.  ${s.title}`, textX, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(105);
    const lines = doc.splitTextToSize(s.body, W - M - textX);
    doc.text(lines, textX, y + 15);
    y += 15 + lines.length * 13 + 15;
  });

  // ── Footer ──
  const fy = H - 46;
  doc.setDrawColor(215);
  doc.setLineWidth(1);
  doc.line(M, fy - 18, W - M, fy - 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(120);
  doc.text("Create your own version at Parking, Reimagined (parking-reimagined.com)", M, fy);
  doc.text("© 2026", W - M, fy, { align: "right" });

  return doc;
}

export function downloadActionChecklist(): void {
  buildActionChecklistDoc().save("parking-reimagined-action-checklist.pdf");
}
