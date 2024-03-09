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
```

```js
view(languageStats) 
```