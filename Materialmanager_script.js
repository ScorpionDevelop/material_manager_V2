let inputSection = document.getElementById("inputSection");
let newItemShow = document.getElementById("newItemShow");
let inventoryListID = document.getElementById("inventoryListID");
let save = document.getElementById("save");
let save2 = document.getElementById("saveArray");
let inputID = document.getElementById("inputID");
let inputName = document.getElementById("inputName");
let inputStoreLocation = document.getElementById("inputStoreLocation");
let inputStorePlace = document.getElementById("inputStorePlace");
let deleteAll = document.getElementById("deleteAll");
/////
//TODOS
// Trimmethode an die Eingabefelder hinzufügen
// Prüfen auf leere Felder und Warnung ausgeben
//
////

// let allItemsArray = [];
let allItemsArray = getItemList();
updateItemList();

// aktuelles Datum ermitteln und ausgeben
let inputDate = new Date();
let tag = inputDate.getDate();
let monat = inputDate.getMonth() + 1;
let jahr = inputDate.getFullYear();

let todayDateInput = tag + "." + monat + "." + jahr;
//alert(heuteAktuell);

//
//    Array
//
function addNewItemArray() {
  // create new Object
  let newItemObject = {
    inputIdObj: inputID.value,
    inputNameObj: inputName.value,
    inputStoreLocationObj: inputStoreLocation.value,
    inputStorePlaceObj: inputStorePlace.value,
    todayDateInputObj: todayDateInput,
    lentToObj: "an wen",
    lentDateObj: "wann",
    itemDelete: "delete",
  };
  // new Object to Array
  allItemsArray.push(newItemObject);
  //add new value in Field "Nummer" with ID: inputID
  updateItemList(); // function not completed
  saveAllItemsArray();
  newIDvalue();
}

function updateItemList() {
  let allRowsDel = document.querySelectorAll("tbody>tr");
  allRowsDel.forEach((row) => {
    row.remove();
  });

  allItemsArray.forEach((item, itemIndex) => {
    todoItem = createItemList(item, itemIndex);
  });
}

function createItemList(item, itemIndex) {
  //Erstellen und hinzufügen des TR-Elements
  let TableItemTr = document.createElement("tr");
  inventoryListID.appendChild(TableItemTr);
  TableItemTr.classList.add("inventoryListBodyRow");

  //Erstellen und hinzufügen des TD-Elementes zum zuvor erstellten TR Element

  // ID Nummer
  // let iDText = item.inputIdObj;
  let TableItemTdID = document.createElement("td");
  // TableItemTdID.appendChild(document.createTextNode(item.inputIdObj));
  TableItemTdID.appendChild(document.createTextNode(item.inputIdObj));
  TableItemTr.appendChild(TableItemTdID);

  // Name des Inventars
  let TableItemTdName = document.createElement("td");
  TableItemTdName.appendChild(document.createTextNode(item.inputNameObj));
  TableItemTr.appendChild(TableItemTdName);
  //###################################################################
  // Lagerort
  let TableItemTdStoreLocation = document.createElement("td");
  TableItemTdStoreLocation.appendChild(document.createTextNode(item.inputStoreLocationObj));
  TableItemTr.appendChild(TableItemTdStoreLocation);

  //Lagerplatz
  let TableItemTdStorePlace = document.createElement("td");
  TableItemTdStorePlace.appendChild(document.createTextNode(item.inputStorePlaceObj));
  TableItemTr.appendChild(TableItemTdStorePlace);
  //###################################################################
  // Temporär ausgeschaltet, wird umgebaut und dann wieder implementiert
  //###################################################################
  /*
  // Datum an dem das Inventar erfasst wurde
  let TableItemTdStoreDate = document.createElement("td");
  TableItemTdStoreDate.appendChild(document.createTextNode(item.todayDateInputObj));
  TableItemTr.appendChild(TableItemTdStoreDate);

  // wenn verliehen, an wen
  let TableItemTdLentTo = document.createElement("td");
  TableItemTdLentTo.appendChild(document.createTextNode("an wen"));
  TableItemTr.appendChild(TableItemTdLentTo);

  // wenn verliehen, wann
  let TableItemTdLentDate = document.createElement("td");
  TableItemTdLentDate.appendChild(document.createTextNode("wann"));
  TableItemTr.appendChild(TableItemTdLentDate);
*/
  //löschen
  let TableItemTdStoreDelete = document.createElement("td");
  //TableItemTdStoreDelete.appendChild(document.createTextNode("löschen"));
  TableItemTr.appendChild(TableItemTdStoreDelete);
  // TableItemTdStoreDelete.addEventListener("click", deleteRow);
  let delButton = document.createElement("span");
  delButton.classList.add("material-symbols-outlined");
  delButton.appendChild(document.createTextNode("delete"));
  delButton.id = "delButton";
  delButton.addEventListener("click", deleteRow);
  TableItemTdStoreDelete.appendChild(delButton);

  //bearbeiten
  let TableItemTdStorechange = document.createElement("td");
  TableItemTr.appendChild(TableItemTdStorechange);
  TableItemTdStorechange.addEventListener("click", editRow);
  let editButton = document.createElement("span");
  editButton.classList.add("material-symbols-outlined");
  editButton.appendChild(document.createTextNode("edit"));
  editButton.id = "changeButton";
  TableItemTdStorechange.appendChild(editButton);

  function setSelection() {
    // Abfrage ob das ausgewählte Element die Klasse bereits besitz
    if (TableItemTr.classList.contains("inventoryListBodyclick")) {
      // wenn ja, die Klasse entfernen über toggle
      TableItemTr.classList.toggle("inventoryListBodyclick");
    } else {
      // wenn nein, dann
      // Alle anderen TR-Elemente holen
      let allRows = document.querySelectorAll(".inventoryListBodyRow");

      // Durch alle TR-Elemente iterieren und die Klasse entfernen
      allRows.forEach((row) => {
        row.classList.remove("inventoryListBodyclick");
        // und dem aktuellen Element die Klasse zuweisen
      });
      TableItemTr.classList.toggle("inventoryListBodyclick");
    }
  }

  TableItemTr.addEventListener("click", setSelection);

  // Element löschen
  function deleteRow() {
    TableItemTr.remove();
    allItemsArray.splice(itemIndex, 1);
    let i = 0;
    allItemsArray.forEach(() => {
      allItemsArray[i].inputIdObj = i + 1;
      i++;
    });
    updateItemList();
    saveAllItemsArray();
    newIDvalue();
  }

  function editRow() {
    console.log(allItemsArray[itemIndex].inputIdObj);
  }

  // inputID.value = "";
  // inputName.value = "";
  // inputStoreLocation.value = "";
  // inputStorePlace.value = "";
}
//####################################################################

function saveAllItemsArray() {
  const allItemsJson = JSON.stringify(allItemsArray);
  localStorage.setItem("materialItems", allItemsJson);
}
//####################################################################

function getItemList() {
  const materialItems = localStorage.getItem("materialItems") || "[]"; // AUfruf des lokalen Speichers oder wenn leer, dann leeres Array einfügen
  return JSON.parse(materialItems); // JSON Elemente wieder in umwandeln
}
//####################################################################

//####################################################################
//
//    Array - Ende
//
//####################################################################

function inputSectionOnOff() {
  inputSection.classList.toggle("displayNone");
  newIDvalue();
}

function newIDvalue() {
  inputID.value = allItemsArray.length + 1;
}
/*
function createNewTableElement() {
  //Erstellen und hinzufügen des TR-Elements
  let TableItemTr = document.createElement("tr");
  inventoryListID.appendChild(TableItemTr);
  TableItemTr.classList.add("inventoryListBodyRow");

  //Erstellen und hinzufügen des TD-Elementes zum zuvor erstellten TR Elements

  // ID Nummer
  let TableItemTdID = document.createElement("td");
  TableItemTdID.appendChild(document.createTextNode(inputID.value));
  TableItemTr.appendChild(TableItemTdID);

  // Name des Inventars
  let TableItemTdName = document.createElement("td");
  TableItemTdName.appendChild(document.createTextNode(inputName.value));
  TableItemTr.appendChild(TableItemTdName);

  // Lagerort
  let TableItemTdStoreLocation = document.createElement("td");
  TableItemTdStoreLocation.appendChild(document.createTextNode(inputStoreLocation.value));
  TableItemTr.appendChild(TableItemTdStoreLocation);

  //Lagerplatz
  let TableItemTdStorePlace = document.createElement("td");
  TableItemTdStorePlace.appendChild(document.createTextNode(inputStorePlace.value));
  TableItemTr.appendChild(TableItemTdStorePlace);

  // Datum an dem das Inventar erfasst wurde
  let TableItemTdStoreDate = document.createElement("td");
  TableItemTdStoreDate.appendChild(document.createTextNode(todayDateInput));
  TableItemTr.appendChild(TableItemTdStoreDate);

  // wenn verliehen, an wen
  let TableItemTdLentTo = document.createElement("td");
  TableItemTdLentTo.appendChild(document.createTextNode("an wen"));
  TableItemTr.appendChild(TableItemTdLentTo);

  // wenn verliehen, wann
  let TableItemTdLentDate = document.createElement("td");
  TableItemTdLentDate.appendChild(document.createTextNode("wann"));
  TableItemTr.appendChild(TableItemTdLentDate);

  //löschen
  let TableItemTdStoreDelete = document.createElement("td");
  //TableItemTdStoreDelete.appendChild(document.createTextNode("löschen"));
  TableItemTr.appendChild(TableItemTdStoreDelete);
  TableItemTdStoreDelete.addEventListener("click", deleteRow);
  let delButton = document.createElement("span");
  delButton.classList.add("material-symbols-outlined");
  delButton.appendChild(document.createTextNode("delete"));
  delButton.id = "delButton";
  TableItemTdStoreDelete.appendChild(delButton);

  //bearbeiten
  let TableItemTdStorechange = document.createElement("td");
  //TableItemTdStoreDelete.appendChild(document.createTextNode("löschen"));
  TableItemTr.appendChild(TableItemTdStorechange);
  //TableItemTdStorechange.addEventListener("click", deleteRow);
  let editButton = document.createElement("span");
  editButton.classList.add("material-symbols-outlined");
  editButton.appendChild(document.createTextNode("edit"));
  editButton.id = "changeButton";
  TableItemTdStoreDelete.appendChild(editButton);

  function setSelection() {
    // Abfrage ob das ausgewählte Element die Klasse bereits besitz
    if (TableItemTr.classList.contains("inventoryListBodyclick")) {
      // wenn ja, die Klasse entfernen über toggle
      TableItemTr.classList.toggle("inventoryListBodyclick");
    } else {
      // wenn nein, dann
      // Alle anderen TR-Elemente holen
      let allRows = document.querySelectorAll(".inventoryListBodyRow");

      // Durch alle TR-Elemente iterieren und die Klasse entfernen
      allRows.forEach((row) => {
        row.classList.remove("inventoryListBodyclick");
        // und dem aktuellen Element die Klasse zuweisen
      });
      TableItemTr.classList.toggle("inventoryListBodyclick");
    }
  }

  TableItemTr.addEventListener("click", setSelection);

  function deleteRow() {
    TableItemTr.remove();
  }

  inputID.value = "";
  // inputName.value = "";
  // inputStoreLocation.value = "";
  // inputStorePlace.value = "";
}
*/
// Funktion die die komplette Liste löscht
function deleteAllF() {
  let allDelQ = confirm("Soll wirklich alles gelöscht werden");
  if (allDelQ == true) {
    let allRowsDel = document.querySelectorAll("tbody>tr");
    allRowsDel.forEach((row) => {
      row.remove();
    });
  }
}

//save.addEventListener("click", createNewTableElement);
save2.addEventListener("click", addNewItemArray);
newItemShow.addEventListener("click", inputSectionOnOff);
deleteAll.addEventListener("click", deleteAllF);

//####################################################################
//
//                        Test-Übung
//Logik aus ToDo App mit Array und Update TodoListe und speichern in LocalStorage
//####################################################################
//

//
//####################################################################
//                          Ende
//                        Test-Übung
//              Logik aus ToDo App mit Array und Update TodoListe
//####################################################################
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// lineSelection.addEventListener("click", inventoryListBodySelectOnOff);

//####################################################################
//
//                        Test-Übung
//
//####################################################################
/*
// let writeButton = document.getElementById("writeButton");
let newToDo = document.getElementById("newToDo");

//writeButton.addEventListener("click", createListElementTest);

function createListElementTest() {
  let listItem = document.createElement("li");
  listItem.appendChild(document.createTextNode(newToDo.value));
  toDoList.appendChild(listItem);
  newToDo.value = "";

  let delButton = document.createElement("span");
  delButton.classList.add("material-symbols-outlined");
  delButton.appendChild(document.createTextNode("delete"));
  delButton.id = "delButton";
  li.appendChild(delButton);

  function setDone() {
    li.classList.toggle("done");
    if (delSign == true) {
      li.classList.remove("done");
      delSign = false;
    }
  }
  function setDelete() {
    li.classList.add("delete");
    li.classList.remove("done");
    delSign = true;
  }

  li.addEventListener("click", setDone);
  delButton.addEventListener("click", setDelete);
}
*/
