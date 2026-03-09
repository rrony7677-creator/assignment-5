// Global State Management
let allIssues = [];

// Fetches all issue data from the server on page load.
const apiCard = () => {
  showLoader();

  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allIssues = data.data;
      serverData(allIssues);
      hideLoader();
    });
};

// Generates dynamic HTML cards and updates the total issue counter.
const serverData = (recevedData) => {

    const totalCountElement = document.getElementById("total-issue-count");
    if (totalCountElement) {
      totalCountElement.innerText = `${recevedData.length} Issues`;
    }

  const cardContainer = document.getElementById("homeCard");
  cardContainer.innerHTML = "";

  recevedData.forEach((item) => {
    const createElement = document.createElement("div");
    createElement.innerHTML = `

        <div class="max-w-6xl mx-auto mb-4">
            <div onclick="openModal('${item.id}')" class="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow 
                ${item.status === "closed" ? "border-t-4 border-purple-500" : "border-t-4 border-emerald-500"}">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                            <i class="fa-solid fa-circle-check"></i>
                        </div>
                        <span class="bg-red-50 text-red-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">${item.priority}</span>
                    </div>

                    <h3 class="text-lg font-bold text-slate-800 mb-2 leading-snug">${item.title}</h3>
                    <p class="text-slate-500 text-sm mb-6 line-clamp-2">${item.description}</p>

                    <div class="flex flex-wrap gap-2">
                        ${item.labels
                          .map(
                            (label) => `
                            <div class="bg-yellow-500 border-slate-200 text-black text-[12px] pr-3 rounded-lg gap-1.5 uppercase font-bold h-auto">
                                <i class="fa-solid ${label.toLowerCase().includes("bug") ? "fa-bug text-red-400" : "fa-circle-info text-amber-400"}"></i>
                                ${label}
                            </div>`,
                          ).join("")}
                    </div>

                    <div class="mt-5 border-t border-slate-50 flex justify-between items-center text-slate-400">
                        <span class="text-xs font-medium">#${item.id} by <span class="text-slate-600">${item.author}</span></span>
                        <span class="text-[10px]">${new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>`; 
    cardContainer.appendChild(createElement);
  });
};

// Filtering Logic
const filterByStatus = (status) => {
  const filteredIssues =
    status === "all" ? allIssues : allIssues.filter((item) => item.status === status);
    serverData(filteredIssues); 
};

// Event Listeners for Filters
document.getElementById("btn-all").addEventListener("click", () => filterByStatus("all"));

document.getElementById("btn-open").addEventListener("click", () => filterByStatus("open"));

document.getElementById("btn-closed").addEventListener("click", () => filterByStatus("closed"));


// Search Functionality
const searchData = document.getElementById("search-btn").addEventListener('click', () => {
  showLoader();

  const input = document.getElementById("search-input");
  const searchValue = input.value.trim().toLowerCase()
  console.log(searchValue);

  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
      const allIssues = data.data;
      serverData(allIssues);
      hideLoader();
    });
});


// Active Button Styling Toggle
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', (event) => {
  
        filterButtons.forEach(btn => {
            btn.classList.add('btn-soft'); 
        });

        event.currentTarget.classList.remove('btn-soft');

        const status = event.currentTarget.innerText.toLowerCase();
        filterByStatus(status);
    });
});

// Modal Detail Handler
const openModal = (id) => {

  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)

    .then((res) => res.json())
    .then((data) => {
      const modalData = data.data;
      console.log(modalData);

      const modalBox = document.getElementById("modal-content");
      modalBox.innerHTML = `
          <h2 class="text-2xl font-bold mb-4">${modalData.title}</h2>
          <div class="flex gap-2 mb-4">
              <span class="badge badge-success">${modalData.status}</span>
          </div>
          
          <p class="text-slate-500 mb-6">${modalData.description}</p>

          <div class="flex flex-wrap gap-2 mb-5">${modalData.labels
            .map(
              (label) => `
                <div class="bg-yellow-500 border-slate-200 text-black text-[12px] pr-3 rounded-lg gap-1.5 uppercase font-bold h-auto">
                    <i class="fa-solid ${label.toLowerCase().includes("bug") ? "fa-bug text-red-400" : "fa-circle-info text-amber-400"}"></i>${label}
                </div>`,
            )
            .join("")}
          </div>
          <div class="p-4 bg-slate-50 rounded-lg flex items-center">
                <div class="space-y-3">
                    <p><strong>Assignee:</strong> ${modalData.assignee || "None"}</p>
                    <p><strong>Created:</strong> ${new Date(modalData.createdAt).toLocaleDateString()}</p>
                </div>
                <div class="ml-32 space-y-3">
                    <p>Priority:</p>
                    <span class="badge badge-error">${modalData.priority}</span>
                </div>
            </div>
          `;
      document.getElementById("issue_modal").showModal();
    })
};

// Loader show korar jonno
const showLoader = () => {
    document.getElementById("global-loader").classList.remove("hidden");
};

// Loader bondho korar jonno
const hideLoader = () => {
    document.getElementById("global-loader").classList.add("hidden");
};

apiCard();