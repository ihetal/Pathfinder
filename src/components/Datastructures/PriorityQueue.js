//PriorityQueue Implementation
class QueueElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}
class PriorityQueue {
  constructor() {
    this.items = [];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  swap(element1, element2) {
    let temp = this.items[element2];
    this.items[element2] = this.items[element1];
    this.items[element1] = temp;
  }
  enqueue(element, priority) {
    let newElement = new QueueElement(element, priority);
    this.items.push(newElement);
    if (this.items.length === 1) {
      return;
    }
    let current = this.items.length - 1;
    let parent = Math.floor((current - 1) / 2);
    while (this.items[current].priority < this.items[parent].priority) {
      this.swap(current, parent);
      current = parent;
      if (current === 0) break;
      parent = Math.floor((current - 1) / 2);
    }
  }
  dequeue() {
    if (this.items.length === 0) return;
    let dequedElement = this.items[0];

    if (this.items.length === 1) {
      this.items = [];
    } else {
      let lastElement = this.items.pop();
      this.items[0] = lastElement;
      this.sinkDown(0);
    }

    return dequedElement;
  }
  sinkDown(index) {
    let left = 2 * index + 1;
    let right = 2 * index + 2;
    let smallest = index;

    if (
      left <= this.items.length - 1 &&
      this.items[left].priority < this.items[index].priority
    ) {
      smallest = left;
    }
    if (
      right <= this.items.length - 1 &&
      this.items[right].priority < this.items[index].priority &&
      this.items[right].priority < this.items[left].priority
    ) {
      smallest = right;
    }
    if (index !== smallest) {
      this.swap(index, smallest);
      this.sinkDown(smallest);
    }
  }
}

export default PriorityQueue;
