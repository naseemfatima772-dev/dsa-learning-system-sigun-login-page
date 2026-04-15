let currentAlgo = '';
let linkedList = [];

let arr = [];
let steps = [];
let stepIndex = -1;
let swaps = 0, comparisons = 0;
let intervalId = null;
let isRunning = false;
/* ===== BST ===== */
class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

let bstRoot = null;


/* DOM Elements */
const dashboard = document.getElementById('dashboard');
const infoContainer = document.getElementById('infoContainer');
const boxes = document.getElementById('boxes');
const compareText = document.getElementById('compareText');
const swapsSpan = document.getElementById('swaps');
const comparisonsSpan = document.getElementById('comparisons');

const definitionText = document.getElementById('definitionText');
const complexityText = document.getElementById('complexityText');
const usesText = document.getElementById('usesText');
const codeText = document.getElementById('codeText');

/* Navigation */
function showDashboard() {
  dashboard.style.display = 'grid';   // ✅ FIX
  infoContainer.style.display = 'none';

  resetDashboardCards();              // ✅ ADD (neeche function diya hai)
}


function openInfo(algo) {
  currentAlgo = algo;

  // ✅ ALWAYS switch page
  dashboard.style.display = 'none';
  infoContainer.style.display = 'block';

  // ✅ TREE VISIBILITY CONTROL
  const treeDiv = document.getElementById('tree');
  if (algo.startsWith('bst')) {
    treeDiv.style.display = 'block';
  } else {
    treeDiv.style.display = 'none';
  }

  document.getElementById('searchKey').style.display =
    (algo === 'linear' || algo === 'binary') ? 'inline-block' : 'none';

  document.getElementById('searchBtn').style.display =
    (algo === 'linear' || algo === 'binary') ? 'inline-block' : 'none';

  document.getElementById('searchMessage').innerText = '';

  if (algo === 'bubble') {
    definitionText.innerText =
      "Bubble Sort compares adjacent elements and swaps them if required.";
    complexityText.innerText =
      "Best: O(n), Average: O(n²), Worst: O(n²)";
    usesText.innerText =
      "Educational purposes, small datasets.";
    codeText.innerText =
`for(int i=0;i<n-1;i++)
 for(int j=0;j<n-i-1;j++)
  if(arr[j]>arr[j+1])
   swap(arr[j],arr[j+1]);`;
  }

  if (algo === 'selection') {
    definitionText.innerText =
      "Selection Sort finds the minimum element and places it at correct position.";
    complexityText.innerText =
      "Best / Average / Worst: O(n²)";
    usesText.innerText =
      "Simple implementation, teaching.";
    codeText.innerText =
`for(int i=0;i<n-1;i++){
 int min=i;
 for(int j=i+1;j<n;j++)
  if(arr[j]<arr[min]) min=j;
 swap(arr[i],arr[min]);
}`;
  }

  if (algo === 'insertion') {
    definitionText.innerText =
      "Insertion Sort places each element in its correct position in the sorted part.";
    complexityText.innerText =
      "Best: O(n), Average: O(n²), Worst: O(n²)";
    usesText.innerText =
      "Small datasets, nearly sorted data.";
    codeText.innerText =
`for(int i=1;i<n;i++){
 int key=arr[i], j=i-1;
 while(j>=0 && arr[j]>key){
  arr[j+1]=arr[j];
  j--;
 }
 arr[j+1]=key;
}`;
  }

  if (algo === 'linear') {
    definitionText.innerText =
      "Linear Search checks each element until the target is found.";
    complexityText.innerText =
      "Best: O(1), Average/Worst: O(n)";
    usesText.innerText =
      "Small lists, unsorted data.";
    codeText.innerText =
`for(int i=0;i<n;i++)
 if(arr[i]==key)
  return i;`;
  }

  if (algo === 'binary') {
    definitionText.innerText =
      "Binary Search works on sorted arrays by repeatedly dividing the search range in half.";
    complexityText.innerText =
      "Best: O(1), Average/Worst: O(log n)";
    usesText.innerText =
      "Used in large sorted datasets.";
    codeText.innerText =
`int binarySearch(int arr[], int n, int key) {
 int low=0, high=n-1;
 while(low<=high){
  int mid=(low+high)/2;
  if(arr[mid]==key) return mid;
  else if(arr[mid]<key) low=mid+1;
  else high=mid-1;
 }
 return -1;
}`;
  }
  if (algo === 'enqueueFront') {
  definitionText.innerText =
    "Enqueue at Front adds an element at the front of the queue.";

  complexityText.innerText = "Time Complexity: O(1)";

  usesText.innerText =
    "Used when priority insertion is required.";

  codeText.innerText =
`function enqueueFront(queue, value){
  queue.unshift(value);
}`;
}

  if (algo === 'enqueueLast') {
  definitionText.innerText =
    "Enqueue at Last adds an element at the rear of the queue.";

  complexityText.innerText = "Time Complexity: O(1)";

  usesText.innerText =
    "Used when data is processed in FIFO order.";

  codeText.innerText =
`function enqueueLast(queue, value){
  queue.push(value);
}`;

}
if (algo === 'dequeueFront') {
  definitionText.innerText =
    "Dequeue from Front removes the first element of the queue.";

  complexityText.innerText = "Time Complexity: O(1)";

  usesText.innerText =
    "Used in scheduling and request handling.";

  codeText.innerText =
`function dequeueFront(queue){
  return queue.shift();
}`;
}
 
if (algo === 'dequeueLast') {
  definitionText.innerText =
    "Dequeue from Last removes the last element of the queue.";

  complexityText.innerText = "Time Complexity: O(1)";

  usesText.innerText =
    "Used in double-ended queues (Deque).";

  codeText.innerText =
`function dequeueLast(queue){
  return queue.pop();
}`;

  
}
if (algo === 'peekFront') {
  definitionText.innerText =
    "Peek (Front) shows the first element of the queue without removing it.";

  complexityText.innerText = "Time Complexity: O(1)";

  usesText.innerText =
    "Used to check the next element to be processed.";

  codeText.innerText =
`function peekFront(queue){
  return queue[0];
}`;

  
}

/* ===== LINKED LIST OPERATIONS ===== */

if (algo === 'llInsertFront') {
  definitionText.innerText = "Insert node at beginning of linked list.";
  complexityText.innerText = "O(1)";
  usesText.innerText = "Fast insertion at start.";
  codeText.innerText =
`newNode->next = head;
head = newNode;`;
 
}

if (algo === 'llInsertLast') {
  definitionText.innerText = "Insert node at end of linked list.";
  complexityText.innerText = "O(n)";
  usesText.innerText = "Append data.";
  codeText.innerText =
`while(temp->next!=NULL)
 temp=temp->next;
temp->next=newNode;`;
}

if (algo === 'llInsertPos') {
  definitionText.innerText = "Insert node at specific position.";
  complexityText.innerText = "O(n)";
  usesText.innerText = "Insert anywhere.";
  codeText.innerText =
`for(i=1;i<pos-1;i++)
 temp=temp->next;`;
}

if (algo === 'llDeleteFront') {
  definitionText.innerText = "Delete first node.";
  complexityText.innerText = "O(1)";
  usesText.innerText = "Fast deletion.";
  codeText.innerText =
`head = head->next;`;

  
}

if (algo === 'llDeleteLast') {
  definitionText.innerText = "Delete last node.";
  complexityText.innerText = "O(n)";
  usesText.innerText = "Remove tail.";
  codeText.innerText =
`while(temp->next->next!=NULL)
 temp=temp->next;`;
  
}

else if (algo === 'llDeletepos') {
  currentAlgo = 'llDeletepos';

  // text (optional but useful)
  definitionText.innerText = "Delete node at specific position.";
  complexityText.innerText = "O(n)";
  usesText.innerText = "Remove node from a given index.";
  codeText.innerText =
`for(i=1;i<pos;i++)
 temp=temp->next;
temp->next = temp->next->next;`;

  // 🔴 IMPORTANT UI FIX
  document.getElementById('position').style.display = 'inline-block';
  document.getElementById('val').style.display = 'none';
}


if (algo === 'llDisplay') {
  definitionText.innerText = "Display linked list.";
  complexityText.innerText = "O(n)";
  usesText.innerText = "View all nodes.";
  codeText.innerText =
`temp=head;
while(temp!=NULL)
 print(temp->data);`;
  
}
const posInput = document.getElementById('position');

if (algo === 'llInsertPos' || algo === 'llDeletePos') {
  posInput.style.display = 'inline-block';
} else {
  posInput.style.display = 'none';
}
/* ===== STACK ===== */

if (algo === 'stackPush') {
  definitionText.innerText = "Push adds an element on top of stack.";
  complexityText.innerText = "O(1)";
  usesText.innerText = "Undo, function calls.";
  codeText.innerText =
`stack.push(value);`;
}

if (algo === 'stackPop') {
  definitionText.innerText = "Pop removes the top element of stack.";
  complexityText.innerText = "O(1)";
  usesText.innerText = "Backtracking.";
  codeText.innerText =
`stack.pop();`;
}

if (algo === 'stackSearch') {
  definitionText.innerText = "Search element in stack.";
  complexityText.innerText = "O(n)";
  usesText.innerText = "Find element.";
  codeText.innerText =
`for(i=0;i<n;i++)
 if(stack[i]==key)`;
}

if (algo === 'stackDisplay') {
  definitionText.innerText = "Display stack elements.";
  complexityText.innerText = "O(n)";
  usesText.innerText = "View stack.";
  codeText.innerText =
`for(i=top;i>=0;i--)
 print(stack[i]);`;
}
document.getElementById('searchKey').style.display =
  (algo === 'stackSearch') ? 'inline-block' : 'none';

document.getElementById('searchBtn').style.display =
  (algo === 'stackSearch') ? 'inline-block' : 'none';



}

/* ================= BINARY SEARCH ================= */
function startBinarySearch() {
  if (arr.length === 0) return alert("Add some values first");

  arr.sort((a, b) => a - b);
  renderBoxes();

  const key = Number(document.getElementById('searchKey').value);
  const message = document.getElementById('searchMessage');
  message.innerText = '';

  if (isNaN(key)) return alert("Enter a value to search");

  let low = 0;
  let high = arr.length - 1;
  comparisons = 0;

  let interval = setInterval(() => {
    if (low > high) {
     message.innerText = `❌ ${key} not found`;

      clearInterval(interval);
      return;
    }

    let mid = Math.floor((low + high) / 2);
    comparisons++;

    highlightRange(low, high, mid);

    if (arr[mid] === key) {
      message.innerText = `✅ ${key} found at index ${mid}`;

      clearInterval(interval);
    } else if (arr[mid] < key) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }

    comparisonsSpan.innerText = comparisons;
  }, 800);
}

function highlightRange(low, high, mid) {
  const boxEls = document.querySelectorAll(".box");
  boxEls.forEach((box, i) => {
    box.style.background = "#ddd";
    if (i >= low && i <= high) box.style.background = "#c6d8ff";
    if (i === mid) box.style.background = "#6a5acd";
  });
}

/* ========== LINEAR SEARCH ========== */
function startLinearSearch() {
  if(currentAlgo==='binary') return startBinarySearch();

  const key = Number(document.getElementById('searchKey').value);
  const message = document.getElementById('searchMessage');
  message.innerText = '';

  if (isNaN(key)) return alert("Please enter a value to search");
  if (arr.length === 0) return alert("Add some values first");

  renderBoxes();

  let foundIndex = -1;
  for (let i=0;i<arr.length;i++){
    if(arr[i]===key){
      foundIndex=i;
      break;
    }
  }

  if(foundIndex===-1){
   message.innerText = `${key} not found`;

  } else {
    boxes.innerHTML='';
    arr.forEach((v,i)=>{
      const box=document.createElement('div');
      box.className='box';
      if(i===foundIndex) box.classList.add('active');
      box.innerText=v;
      boxes.appendChild(box);
    });
    message.innerText = `${key} found at index ${foundIndex}`;

  }
}
/* ===== BST FUNCTIONS ===== */

function bstInsert(root, value) {
  if (root === null) {
    return new BSTNode(value);
  }

  if (value < root.value) {
    root.left = bstInsert(root.left, value);
  } 
  else if (value > root.value) {
    root.right = bstInsert(root.right, value);
  }

  return root;
}
function bstSearch(root, key) {
  if (root === null) return false;

  if (root.value === key) return true;

  if (key < root.value)
    return bstSearch(root.left, key);
  else
    return bstSearch(root.right, key);
}

function findMin(node) {
  while (node.left !== null) {
    node = node.left;
  }
  return node;
}
function bstDelete(root, key) {
  if (root === null) return null;

  if (key < root.value) {
    root.left = bstDelete(root.left, key);
  }

  else if (key > root.value) {
    root.right = bstDelete(root.right, key);
  }

  else {
    // CASE 1: No child
    if (root.left === null && root.right === null)
      return null;

    // CASE 2: One child
    if (root.left === null)
      return root.right;
    if (root.right === null)
      return root.left;

    // CASE 3: Two children
    let successor = findMin(root.right);
    root.value = successor.value;
    root.right = bstDelete(root.right, successor.value);
  }

  return root;
}
function renderBST() {
  const treeDiv = document.getElementById('tree');
  treeDiv.innerHTML = '';
  if (bstRoot)
    treeDiv.appendChild(createTreeNode(bstRoot));
}

function createTreeNode(node) {
  if (!node) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    return empty;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'node';

  const circle = document.createElement('div');
  circle.className = 'circle';
  circle.innerText = node.value;

  wrapper.appendChild(circle);

  if (node.left || node.right) {
    const children = document.createElement('div');
    children.className = 'children';

    children.appendChild(createTreeNode(node.left));
    children.appendChild(createTreeNode(node.right));

    wrapper.appendChild(children);
  }

  return wrapper;
}


/* Array Handling */
function addValue() {
  if (currentAlgo === 'stackPop' || 
    currentAlgo === 'stackSearch' || 
    currentAlgo === 'stackDisplay') {
  return; // value add ki zarurat hi nahi
}


  const valInput = document.getElementById('val');
  const posInput = document.getElementById('position');

  const val = Number(valInput.value);
  const pos = posInput ? Number(posInput.value) : null;


  if (isNaN(val)) return alert("Enter a value");

  /* ===== QUEUE ===== */
  if (currentAlgo === 'enqueueFront') {
    if (arr.length >= 6) return alert("Max 6 values allowed");
    arr.unshift(val);
    renderBoxes();
    return;
  }

  if (currentAlgo === 'enqueueLast') {
    if (arr.length >= 6) return alert("Max 6 values allowed");
    arr.push(val);
    renderBoxes();
    return;
  }
/* ===== BST INSERT ===== */
if (currentAlgo === 'bstInsert') {
  bstRoot = bstInsert(bstRoot, val);
  renderBST();   // visualization function (baad mein banayenge)
  return;
}

  /* ===== SORTING ===== */
  if (
    currentAlgo === 'bubble' ||
    currentAlgo === 'selection' ||
    currentAlgo === 'insertion' ||
    currentAlgo === 'linear' ||
    currentAlgo === 'binary'
  ) {
    if (arr.length >= 6) return alert("Max 6 values allowed");
    arr.push(val);
    generateSteps();
    renderBoxes();
    return;
  }

  /* ===== LINKED LIST ===== */
  if (currentAlgo.startsWith('ll')) {

    if (linkedList.length >= 6) return alert("Max 6 values allowed");

    if (currentAlgo === 'llInsertFront') {
      linkedList.unshift(val);
    }

    else if (currentAlgo === 'llInsertLast') {
      linkedList.push(val);
    }

    else if (currentAlgo === 'llInsertPos') {
      if (isNaN(pos)) return alert("Enter position");
      if (pos < 0 || pos > linkedList.length)
        return alert("Invalid position");
      linkedList.splice(pos, 0, val);
    }

    arr = [...linkedList];
    renderBoxes();
    return;
  }

  
  /* ===== STACK PUSH ===== */
if (currentAlgo === 'stackPush') {
  if (arr.length >= 6) return alert("Max 6 values allowed");
  arr.push(val);
  renderBoxes();
  return; // 🔥 VERY IMPORTANT
}
}



  function startSorting() {
    if (currentAlgo === 'bstDelete') {
    const key = Number(document.getElementById('val').value);
    if (isNaN(key)) return alert("Enter value to delete");

    bstRoot = bstDelete(bstRoot, key);
    renderBST();   // baad mein define karenge
    return;
  }
  if (currentAlgo === 'bstSearch') {
  const key = Number(document.getElementById('val').value);
  if (isNaN(key)) return alert("Enter value to search");

  const found = bstSearch(bstRoot, key);

  document.getElementById('searchMessage').innerText =
    found ? `✅ ${key} found in BST` : `❌ ${key} not found in BST`;

  return;
}

    if (currentAlgo === 'peekFront') {
  if (arr.length === 0) {
    alert("Queue is empty");
    return;
  }
  document.getElementById('searchMessage').innerText =
    `Front value is: ${arr[0]}`;
  return;
}

    /* ===== QUEUE DELETE ===== */
if (currentAlgo === 'dequeueFront') {
  if (arr.length === 0) return alert("Queue is empty");
  arr.shift();
  renderBoxes();
  return;
}

else if (currentAlgo === 'dequeueLast') {
  if (arr.length === 0) return alert("Queue is empty");
  arr.pop();
  renderBoxes();
  return;
}


  /* ===== LINKED LIST DELETE & DISPLAY ===== */
  if (currentAlgo.startsWith('ll')) {

   if (currentAlgo === 'llDeletefront') {
  if (linkedList.length === 0) {
    alert("Linked List is empty");
    return;
  }
  linkedList.shift();
}

else if (currentAlgo === 'llDeletelast') {
  if (linkedList.length === 0) {
    alert("Linked List is empty");
    return;
  }
  linkedList.pop();
}


   else if (currentAlgo === 'llDeletepos') {
  const pos = parseInt(document.getElementById('position').value, 10);

  if (linkedList.length === 0) {
    alert("Linked List is empty");
    return;
  }

  if (isNaN(pos) || pos < 0 || pos >= linkedList.length) {
    alert("Invalid position");
    return;
  }

  linkedList.splice(pos, 1);   // ✅ POS delete
}


    else if (currentAlgo === 'llDisplay') {
      // just display
    }

    arr = [...linkedList];
    renderBoxes();
    return; // 🔥 VERY IMPORTANT
  }
  if (currentAlgo === 'stackPop') {
  if (arr.length === 0) return alert("Stack is empty");
  arr.pop();
  renderBoxes();
  return;
}

if (currentAlgo === 'stackSearch') {
  const key = Number(document.getElementById('searchKey').value);
  if (isNaN(key)) return alert("Enter value to search");

  const index = arr.lastIndexOf(key); // top se search
  if (index === -1) {
    document.getElementById('searchMessage').innerText =
      `${key} not found in stack`;
  } else {
    document.getElementById('searchMessage').innerText =
      `${key} found at position ${arr.length - index}`;
  }
  return;
}

if (currentAlgo === 'stackDisplay') {
  renderBoxes();
  return;
}
if (currentAlgo === 'bstSearch') {
  const key = Number(document.getElementById('searchKey').value);
  if (isNaN(key)) return alert("Enter value to search");

  const found = bstSearch(bstRoot, key);
  document.getElementById('searchMessage').innerText =
    found ? `✅ ${key} found in BST` : `❌ ${key} not found`;
  return;
}




  /* ===== SORTING ===== */
  if (
    currentAlgo !== 'bubble' &&
    currentAlgo !== 'selection' &&
    currentAlgo !== 'insertion' &&
    currentAlgo !== 'linear'
  ) return;

  if (steps.length === 0) return alert("Please add values first");
  if (isRunning) return;

  isRunning = true;
  intervalId = setInterval(() => {
    if (stepIndex + 1 >= steps.length) {
      pauseSorting();
      return;
    }
    nextStep();
  }, 800);

/* ===== STACK OPERATIONS ===== */





}

function pauseSorting() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    isRunning = false;
  }
}

/* Visualization */
function renderBoxes(i1=-1,i2=-1){
  boxes.innerHTML='';
  arr.forEach((v,i)=>{
    const box=document.createElement('div');
    box.className='box';
    if(i===i1 || i===i2) box.classList.add('active');
    box.innerText=v;
    boxes.appendChild(box);
  });
}

/* Step Generation */
function generateSteps(){
  steps=[];
  stepIndex=-1;
  swaps=0;
  comparisons=0;

  let a=[...arr];

  if(currentAlgo==='bubble'){
    for(let i=0;i<a.length-1;i++){
      for(let j=0;j<a.length-i-1;j++){
        steps.push({array:[...a],compare:[j,j+1],swap:false});
        if(a[j]>a[j+1]){
          [a[j],a[j+1]]=[a[j+1],a[j]];
          steps.push({array:[...a],compare:[j,j+1],swap:true});
        }
      }
    }
  }

  if(currentAlgo==='selection'){
    for(let i=0;i<a.length-1;i++){
      let min=i;
      for(let j=i+1;j<a.length;j++){
        steps.push({array:[...a],compare:[min,j],swap:false});
        if(a[j]<a[min]) min=j;
      }
      if(min!==i){
        [a[i],a[min]]=[a[min],a[i]];
        steps.push({array:[...a],compare:[i,min],swap:true});
      }
    }
  }

  if(currentAlgo==='insertion'){
    for(let i=1;i<a.length;i++){
      let key=a[i],j=i-1;
      while(j>=0 && a[j]>key){
        steps.push({array:[...a],compare:[j,j+1],swap:false});
        a[j+1]=a[j];
        steps.push({array:[...a],compare:[j,j+1],swap:true});
        j--;
      }
      a[j+1]=key;
      steps.push({array:[...a],compare:[j+1,i],swap:true});
    }
  }

  if(currentAlgo==='linear'){
    const key=a[a.length-1];
    for(let i=0;i<a.length;i++){
      steps.push({array:[...a],compare:[i,i],swap:false});
      if(a[i]===key) break;
    }
  }
  
  renderBoxes();
}

/* Step Navigation */
function nextStep(){
  if(stepIndex+1>=steps.length) return;
  stepIndex++;
  const s=steps[stepIndex];
  arr=[...s.array];
  renderBoxes(s.compare[0],s.compare[1]);

  comparisons++;
  if(s.swap) swaps++;

  swapsSpan.innerText=swaps;
  comparisonsSpan.innerText=comparisons;

  
    compareText.innerText =
  `Comparing index ${s.compare[0]} & ${s.compare[1]} ${s.swap ? '- Swap' : ''}`;
}

function prevStep(){
  if(stepIndex<=0) return resetAll();
  stepIndex--;
  swaps=0;
  comparisons=0;
  for(let i=0;i<=stepIndex;i++){
    comparisons++;
    if(steps[i].swap) swaps++;
  }
  const s=steps[stepIndex];
  arr=[...s.array];
  renderBoxes(s.compare[0],s.compare[1]);

  swapsSpan.innerText=swaps;
  comparisonsSpan.innerText=comparisons;
}

/* Reset */
function resetAll(){

  bstRoot = null;                 // ✅ ADD THIS
  document.getElementById('tree').innerHTML = ''; // ✅ ADD THIS

  pauseSorting();
  arr = [];
  linkedList = []; // 🔥 ADD THIS LINE
  steps = [];
  stepIndex = -1;
  swaps = 0;
  comparisons = 0;

  renderBoxes();
  swapsSpan.innerText = 0;
  comparisonsSpan.innerText = 0;
  compareText.innerText = '-';
}

/* ===== DASHBOARD FILTER BUTTONS ===== */

function showAllCards() {
  resetDashboardCards(); // ✅ VERY IMPORTANT

  document.querySelectorAll('.card').forEach(card => {
    card.style.display = 'block';
  });

  dashboard.style.display = 'grid'; // ✅ ENSURE GRID
}


function showSortingCards() {
  document.querySelectorAll('.card').forEach(card => {
    card.style.display = card.classList.contains('sorting-card')
      ? 'block'
      : 'none';
  });
}

function showQueueCards() {
  document.querySelectorAll('.card').forEach(card => {
    card.style.display = card.classList.contains('queue-card')
      ? 'block'
      : 'none';
  });
}
function showLLCards() {
  document.querySelectorAll('.card').forEach(card => {
    card.style.display = card.classList.contains('ll-card')
      ? 'block'
      : 'none';
  });
}
function showStackCards() {
  document.querySelectorAll('.card').forEach(card => {
    card.style.display = card.classList.contains('stack-card')
      ? 'block'
      : 'none';
  });
}

function showBSTCards() {
  document.querySelectorAll('.card').forEach(card => {
    card.style.display = card.classList.contains('bst-card')
      ? 'block'
      : 'none';
  });
}
function resetDashboardCards() {
  document.querySelectorAll('.card').forEach(card => {
    card.style.display = '';
    card.style.width = '';
    card.style.maxWidth = '';
    card.style.flexDirection = '';
    card.style.writingMode = 'horizontal-tb';
    card.style.transform = '';
  });
}
