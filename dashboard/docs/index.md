---
theme: dashboard
toc: false
---

```js
async function getJsonData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
  return await response.json();
}

const languageStats = await getJsonData("https://raw.githubusercontent.com/bradfordjohnson/tenK-lines/master/data/language_statistics.json");

const projectStats = await getJsonData("https://raw.githubusercontent.com/bradfordjohnson/tenK-lines/master/data/project_statistics.json");
```

```js
const lineSums = {};

languageStats.forEach(item => {
  const language = item.language;
  const stats = item.stats;

  if (!lineSums[language]) {
    lineSums[language] = 0;
  }

  const totalLines = stats.reduce((acc, curr) => acc + curr.lines, 0);

  lineSums[language] += totalLines;
});
```

```js
const totalLines = Object.values(lineSums).reduce((acc, curr) => acc + curr, 0);

// get the language with the most lines
const mostLines = Object.entries(lineSums).reduce((acc, curr) => {
  return acc[1] > curr[1] ? acc : curr;
});
```

```js
const fileCounts = {};

languageStats.forEach(item => {
  const language = item.language;
  const stats = item.stats;

  // If the language doesn't exist in the fileCounts object, initialize it with 0
  if (!fileCounts[language]) {
    fileCounts[language] = 0;
  }

  // Count the number of files for each language
  fileCounts[language] += stats.length;
});

// get the total number of files
const totalFiles = Object.values(fileCounts).reduce((acc, curr) => acc + curr, 0);

// get the language with the most files
const mostFiles = Object.entries(fileCounts).reduce((acc, curr) => {
  return acc[1] > curr[1] ? acc : curr;
});
```
# tenK-lines

<p>This is a project with a goal to write 10,000 lines of code in various languages. Achieving this goal not only helps to improve my skills in these languages, but also provides a way to explore common patterns in problem solving and paradigms across different languages.</p>

<div class="grid grid-cols-4">
<a class="card" style="color: inherit;">
    <h2>Total lines of code</h2>
    <span class="big">${totalLines}</span>
    <!-- <span class="muted">${}</span> -->
  </a>
  <a class="card" style="color: inherit;">
    <h2>Most lines written in</h2>
    <span class="big">${mostLines[0]}</span>
    <br>
    <span class="muted">${mostLines[1]+" lines"}</span>
  </a>
  <a class="card" style="color: inherit;">
    <h2>Total scripts</h2>
    <span class="big">${totalFiles}</span>
    <!-- <span class="muted">${}</span> -->
  </a>
  <a class="card" style="color: inherit;">
    <h2>Most scripts written with</h2>
    <span class="big">${mostFiles[0]}</span>
    <br>
    <span class="muted">${mostFiles[1]+" scripts"}</span>
  </a>
</div>

```js
view(languageStats)

view(lineSums)
```