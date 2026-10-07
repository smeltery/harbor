const output = document.querySelector("#demo-output");
const initial = output.textContent;
const steps = {
  launch: initial,
  inspect: '$ slipway ui Notes\n\nAXTextField "Search"   center 300,120\nAXButton "New note"    center 80,64\n\n$ slipway type "release"\n$ slipway shot Notes',
  observe: 'PORTHOLE / SESSION TIMELINE\n\n09:41:02  Opened Notes             ✓\n09:41:04  Read window controls     ✓\n09:41:06  Typed “release”          ✓\n09:41:07  Captured Notes window    ✓\n\nOne agent · one target · a complete trail',
};
for (const button of document.querySelectorAll("[data-step]")) {
  button.addEventListener("click", () => {
    output.textContent = steps[button.dataset.step];
    for (const other of document.querySelectorAll("[data-step]")) {
      other.setAttribute("aria-pressed", String(other === button));
    }
  });
}
document.querySelector("#copy").addEventListener("click", async () => {
  const status = document.querySelector("#copy-status");
  try {
    await navigator.clipboard.writeText(document.querySelector("#install-command").textContent);
    document.querySelector("#copy").textContent = "Copied";
    status.textContent = "Commands copied.";
  } catch {
    status.textContent = "Copy unavailable. Select the commands above to copy manually.";
  }
});
