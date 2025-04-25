const fs = require("fs")

fs.readdirSync(__dirname + "/test").forEach((file) => {
  if (file === __filename) return

  const tests = require(__dirname + "/test/" + file)

  if (typeof tests !== "object") return

  describe(file, () => {
    for (const title in tests) it(title, tests[title])
  })
})
