// renderer.js
const { ipcRenderer } = require("electron")

const fetchBtn = document.getElementById("fetchBtn")
const listBtn = document.getElementById("listBtn")
const output = document.getElementById("output")

fetchBtn.addEventListener("click", async () => {
  output.textContent = "Fetching..."
  const result = await ipcRenderer.invoke("execute-command", "fetch")
  output.textContent = result
})

listBtn.addEventListener("click", async () => {
  const result = await ipcRenderer.invoke("execute-command", "list")
  output.textContent = result
})
