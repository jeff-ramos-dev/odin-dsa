class LinkNode<T> {
  next: LinkNode<T> | null = null;
  value: T | null = null;

  constructor(value: T) {
    this.value = value;
  };
};

class LinkedList<T> {
  head: LinkNode<T> | null = null;
  tail: LinkNode<T> | null = null;
  size: number = 0;

  append(value: T) {
    if (!this.head) {
      this.head = this.tail = new LinkNode(value);
      this.size++;
      return;
    };
    const node = new LinkNode(value);
    let current = this.head;
    while (current.next) {
      current = current.next;
    };
    current.next = node;
    node.next = null
    this.tail = node;
    this.size++;
    return;
  };

  prepend(value: T) {
    if (!this.head) {
      this.head = new LinkNode(value);
      this.size++;
    };
    const node = new LinkNode(value);
    node.next = this.head
    this.head = node
    this.size++
    return
  };

  at(index: number): LinkNode<T> | null {
    if (!this.head) {
      return null
    }
    if (index >= this.size) {
      return null
    }
    let current = this.head
    let i = 0
    while (index < this.size && current.next && i < index) {
      current = current.next
      i++
    }
    return current
  }

  pop(): LinkNode<T> | null {
    if (!this.head) {
      return null
    }
    let current = this.head
    while (current.next) {
      if (!current.next.next) {
        this.tail = current
        this.tail.next = null
        this.size--
        return current.next
      }
      current = current.next
    }
    return null
  }

  contains(value: number): boolean {
    if (!this.head) {
      return false
    }
    let current = this.head
    while (current.next) {
      if (current.value === value) {
        return true
      }
      current = current.next
    }
    return false
  }

  find(value: number): number | null {
    if (!this.head) {
      return null
    }
    let current = this.head
    let count = 0
    while (current.next) {
      if (current.value === value) {
        return count
      }
      current = current.next
      count++
    }
    return null
  }

  toString(): string {
    if (!this.head) {
      return "null"
    }
    let output = `( ${this.head.value} ) ->`
    let current = this.head
    while (current.next) {
      current = current.next
      output += ` ( ${current.value} ) ->`
    }
    output += " null"
    return output
  }

  insertAt(value: T, index: number) {
    if (index > this.size) {
      return
    }
    if (index === this.size) {
      this.append(value)
      return
    }
    if (index === 0) {
      this.prepend(value)
      return
    }
    if (!this.head) {
      return
    }
    const node = new LinkNode(value);
    let current = this.head
    let count = 0
    while (current.next) {
      if (count === index - 1) {
        node.next = current.next
        current.next = node
        this.size++
        return
      }
      current = current.next
      count++
    }
    return
  }

  removeAt(index: number) {
    if (!this.head) {
      return
    }
    if (index > this.size) {
      return
    }
    if (index === this.size) {
      this.pop()
      return
    }
    if (index === 0) {
      this.head === this.head.next
      this.size--
      return
    }
    let current = this.head
    let count = 0
    while (current.next) {
      if (count === index - 1) {
        current.next = current.next.next
        this.size--
        return
      }
      current = current.next
      count++
    }
    return
  }
}

function test() {
  let example = new LinkedList<Number>();

  console.log(example.size)
  console.log(example.toString());

  example.append(1);
  console.log(example.size)
  console.log(example.toString());

  example.append(2);
  console.log(example.size)
  console.log(example.toString());

  example.prepend(10);
  console.log(example.size);
  console.log(example.toString());

  example.insertAt(12, 1);
  console.log(example.size);
  console.log(example.toString());

  console.log("index 1: ", example.at(1))
  console.log(example.size);
  console.log(example.toString());

  example.append(8);
  console.log(example.size);
  console.log(example.toString());

  example.prepend(3);
  console.log(example.size);
  console.log(example.toString());

  example.removeAt(2);
  console.log(example.size);
  console.log(example.toString());

  console.log("finding 10... ", example.find(10));
  console.log("finding 1... ", example.find(1))
  console.log(example.size);
  console.log(example.toString());

  console.log("contains 10?: ", example.contains(10))
  console.log("contains 1?: ", example.contains(1))
  console.log(example.size);
  console.log(example.toString());
};

test();