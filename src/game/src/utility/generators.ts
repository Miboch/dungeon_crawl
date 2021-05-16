function* numberGenerator() {
  let current = 0;
  while (true) {
    yield current++;
  }
}

export const entityIdGenerator = numberGenerator();
