const networks = [
  {
    name: "Ethereum",
    chainId: 1,
    gasHint: "Wysoki koszt, wybierz minimalny transfer.",
  },
  {
    name: "Polygon",
    chainId: 137,
    gasHint: "Tani gas, szybkie potwierdzenia.",
  },
  {
    name: "Arbitrum",
    chainId: 42161,
    gasHint: "L2 z niższymi opłatami.",
  },
  {
    name: "Optimism",
    chainId: 10,
    gasHint: "Stabilny L2, tańsze transakcje.",
  },
];

const networkGrid = document.getElementById("networkGrid");
const status = document.getElementById("status");
const log = document.getElementById("log");
const gasBudget = document.getElementById("gasBudget");
const collectorAddress = document.getElementById("collectorAddress");
const dustAmount = document.getElementById("dustAmount");
const burnGas = document.getElementById("burnGas");
const simulate = document.getElementById("simulate");

let activeNetwork = null;

const addLog = (message) => {
  const item = document.createElement("li");
  item.textContent = message;
  log.prepend(item);
};

const setStatus = (message, isActive = false) => {
  status.textContent = message;
  status.classList.toggle("active", isActive);
};

const renderNetworks = () => {
  networkGrid.innerHTML = "";
  networks.forEach((network) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "network-card";
    card.innerHTML = `
      <strong>${network.name}</strong>
      <small>Chain ID: ${network.chainId}</small>
      <small>${network.gasHint}</small>
    `;
    card.addEventListener("click", () => {
      document
        .querySelectorAll(".network-card")
        .forEach((node) => node.classList.remove("active"));
      card.classList.add("active");
      activeNetwork = network;
      setStatus(`Wybrano sieć: ${network.name}.`, true);
    });
    networkGrid.appendChild(card);
  });
};

const validate = () => {
  if (!activeNetwork) {
    setStatus("Najpierw wybierz sieć.");
    return false;
  }
  if (!collectorAddress.value) {
    setStatus("Uzupełnij adres zbierający.");
    return false;
  }
  if (Number(gasBudget.value) <= 0) {
    setStatus("Budżet na gas musi być większy od zera.");
    return false;
  }
  return true;
};

const handleSimulation = () => {
  if (!validate()) {
    return;
  }
  setStatus("Symulacja zakończona. Sprawdź log.", true);
  addLog(
    `Symulacja: ${activeNetwork.name} | gas: ${gasBudget.value} gwei | dust: ${dustAmount.value}`
  );
};

const handleBurn = () => {
  if (!validate()) {
    return;
  }
  setStatus("Gotowe do uruchomienia transakcji (demo).", true);
  addLog(
    `Demo: spalanie gasu na ${activeNetwork.name} z budżetem ${gasBudget.value} gwei.`
  );
  addLog(
    `Demo: wysyłka ${dustAmount.value} na adres ${collectorAddress.value}.`
  );
};

burnGas.addEventListener("click", handleBurn);
simulate.addEventListener("click", handleSimulation);

renderNetworks();
setStatus("Wybierz sieć, aby rozpocząć.");
