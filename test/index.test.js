/**
 * Module requirements.
 */

require("should")

var Table = require("../")

/**
 * Tests.
 */

module.exports = {
  "test complete table": function () {
    var table = new Table({
      head: ["Rel", "Change", "By", "When"],
      style: {
        "padding-left": 1,
        "padding-right": 1,
        head: [],
        border: [],
      },
      colWidths: [6, 21, 25, 17],
    })

    table.push(
      ["v0.1", "Testing something cool", "rauchg@gmail.com", "7 minutes ago"],
      ["v0.1", "Testing something cool", "rauchg@gmail.com", "8 minutes ago"]
    )

    var expected = [
      "┌──────┬─────────────────────┬─────────────────────────┬─────────────────┐",
      "│ Rel  │ Change              │ By                      │ When            │",
      "├──────┼─────────────────────┼─────────────────────────┼─────────────────┤",
      "│ v0.1 │ Testing something … │ rauchg@gmail.com        │ 7 minutes ago   │",
      "├──────┼─────────────────────┼─────────────────────────┼─────────────────┤",
      "│ v0.1 │ Testing something … │ rauchg@gmail.com        │ 8 minutes ago   │",
      "└──────┴─────────────────────┴─────────────────────────┴─────────────────┘",
    ]

    table.toString().should.eql(expected.join("\n"))
  },

  "test width property": function () {
    var table = new Table({
      head: ["Cool"],
      style: {
        head: [],
        border: [],
      },
    })

    table.width.should.eql(8)
  },

  "test vertical table output": function () {
    var table = new Table({
      style: { "padding-left": 0, "padding-right": 0, head: [], border: [] },
    }) // clear styles to prevent color output

    table.push(
      { "v0.1": "Testing something cool" },
      { "v0.1": "Testing something cool" }
    )

    var expected = [
      "┌────┬──────────────────────┐",
      "│v0.1│Testing something cool│",
      "├────┼──────────────────────┤",
      "│v0.1│Testing something cool│",
      "└────┴──────────────────────┘",
    ]

    table.toString().should.eql(expected.join("\n"))
  },

  "test cross table output": function () {
    var table = new Table({
      head: ["", "Header 1", "Header 2"],
      style: { "padding-left": 0, "padding-right": 0, head: [], border: [] },
    }) // clear styles to prevent color output

    table.push(
      { "Header 3": ["v0.1", "Testing something cool"] },
      { "Header 4": ["v0.1", "Testing something cool"] }
    )

    var expected = [
      "┌────────┬────────┬──────────────────────┐",
      "│        │Header 1│Header 2              │",
      "├────────┼────────┼──────────────────────┤",
      "│Header 3│v0.1    │Testing something cool│",
      "├────────┼────────┼──────────────────────┤",
      "│Header 4│v0.1    │Testing something cool│",
      "└────────┴────────┴──────────────────────┘",
    ]

    table.toString().should.eql(expected.join("\n"))
  },

  "test table colors": function () {
    var table = new Table({
      head: ["Rel", "By"],
      style: { head: ["red"], border: ["grey"] },
    })

    var off = "\u001b[39m",
      red = "\u001b[31m",
      orange = "\u001b[38;5;221m",
      grey = "\u001b[90m",
      c256s = orange + "v0.1" + off

    table.push([c256s, "rauchg@gmail.com"])

    var expected = [
      grey + "┌──────┬──────────────────┐" + off,
      grey +
        "│" +
        off +
        red +
        " Rel  " +
        off +
        grey +
        "│" +
        off +
        red +
        " By               " +
        off +
        grey +
        "│" +
        off,
      grey + "├──────┼──────────────────┤" + off,
      grey +
        "│" +
        off +
        " " +
        c256s +
        " " +
        grey +
        "│" +
        off +
        " rauchg@gmail.com " +
        grey +
        "│" +
        off,
      grey + "└──────┴──────────────────┘" + off,
    ]

    table.toString().should.eql(expected.join("\n"))
  },

  "test custom chars": function () {
    var table = new Table({
      chars: {
        top: "═",
        "top-mid": "╤",
        "top-left": "╔",
        "top-right": "╗",
        bottom: "═",
        "bottom-mid": "╧",
        "bottom-left": "╚",
        "bottom-right": "╝",
        left: "║",
        "left-mid": "╟",
        right: "║",
        "right-mid": "╢",
      },
      style: {
        head: [],
        border: [],
      },
    })

    table.push(["foo", "bar", "baz"], ["frob", "bar", "quuz"])

    var expected = [
      "╔══════╤═════╤══════╗",
      "║ foo  │ bar │ baz  ║",
      "╟──────┼─────┼──────╢",
      "║ frob │ bar │ quuz ║",
      "╚══════╧═════╧══════╝",
    ]

    table.toString().should.eql(expected.join("\n"))
  },

  "test compact shortand": function () {
    var table = new Table({
      style: {
        head: [],
        border: [],
        compact: true,
      },
    })

    table.push(["foo", "bar", "baz"], ["frob", "bar", "quuz"])

    var expected = [
      "┌──────┬─────┬──────┐",
      "│ foo  │ bar │ baz  │",
      "│ frob │ bar │ quuz │",
      "└──────┴─────┴──────┘",
    ]

    table.toString().should.eql(expected.join("\n"))
  },

  "test compact empty mid line": function () {
    var table = new Table({
      chars: {
        mid: "",
        "left-mid": "",
        "mid-mid": "",
        "right-mid": "",
      },
      style: {
        head: [],
        border: [],
      },
    })

    table.push(["foo", "bar", "baz"], ["frob", "bar", "quuz"])

    var expected = [
      "┌──────┬─────┬──────┐",
      "│ foo  │ bar │ baz  │",
      "│ frob │ bar │ quuz │",
      "└──────┴─────┴──────┘",
    ]

    table.toString().should.eql(expected.join("\n"))
  },

  "test decoration lines disabled": function () {
    var table = new Table({
      chars: {
        top: "",
        "top-mid": "",
        "top-left": "",
        "top-right": "",
        bottom: "",
        "bottom-mid": "",
        "bottom-left": "",
        "bottom-right": "",
        left: "",
        "left-mid": "",
        mid: "",
        "mid-mid": "",
        right: "",
        "right-mid": "",
        middle: " ", // a single space
      },
      style: {
        head: [],
        border: [],
        "padding-left": 0,
        "padding-right": 0,
      },
    })

    table.push(["foo", "bar", "baz"], ["frobnicate", "bar", "quuz"])

    var expected = ["foo        bar baz ", "frobnicate bar quuz"]

    table.toString().should.eql(expected.join("\n"))
  },

  "test rows option in constructor": () => {
    const table = new Table({
      style: {
        head: [],
        border: [],
      },
      rows: [
        ["foo", "7 minutes ago"],
        ["bar", "8 minutes ago"],
      ],
    })

    const expected = [
      "┌─────┬───────────────┐",
      "│ foo │ 7 minutes ago │",
      "├─────┼───────────────┤",
      "│ bar │ 8 minutes ago │",
      "└─────┴───────────────┘",
    ]

    table.toString().should.eql(expected.join("\n"))
  },

  "test table with no options provided in constructor": () => {
    const table = new Table()

    table.should.exist
  },

  "test table with empty head cell": () => {
    const table = new Table({
      head: [, "bar"],
      style: {
        head: [],
        border: [],
      },
    })

    table.push(["foo", "bar"])

    const expected = [
      "┌─────┬─────┐",
      "│     │ bar │",
      "├─────┼─────┤",
      "│ foo │ bar │",
      "└─────┴─────┘",
    ]

    table.toString().should.eql(expected.join("\n"))
  },

  "test table with empty body cell": () => {
    const table = new Table({
      head: ["foo", "bar"],
      style: {
        head: [],
        border: [],
      },
    })

    table.push([, "bar"])

    const expected = [
      "┌─────┬─────┐",
      "│ foo │ bar │",
      "├─────┼─────┤",
      "│     │ bar │",
      "└─────┴─────┘",
    ]

    table.toString().should.eql(expected.join("\n"))
  },

  "test table with missing head cell": () => {
    const table = new Table({
      head: ["foo"],
      style: {
        head: [],
        border: [],
      },
    })

    table.push(["foo", "bar"])

    const expected = [
      "┌─────┬─────┐",
      "│ foo │     │",
      "├─────┼─────┤",
      "│ foo │ bar │",
      "└─────┴─────┘",
    ]

    table.toString().should.eql(expected.join("\n"))
  },

  "test table with missing body cell": () => {
    const table = new Table({
      head: ["foo", "bar"],
      style: {
        head: [],
        border: [],
      },
    })

    table.push(["foo"])

    const expected = [
      "┌─────┬─────┐",
      "│ foo │ bar │",
      "├─────┼─────┤",
      "│ foo │     │",
      "└─────┴─────┘",
    ]

    table.toString().should.eql(expected.join("\n"))
  },

  "test table with falsy values": () => {
    const table = new Table({
      head: ["", false, undefined, null, NaN, 0],
      style: {
        head: [],
        border: [],
      },
    })

    table.push(["", false, undefined, null, NaN, 0])

    const expected = [
      "┌──┬───────┬───────────┬──────┬─────┬───┐",
      "│  │ false │ undefined │ null │ NaN │ 0 │",
      "├──┼───────┼───────────┼──────┼─────┼───┤",
      "│  │ false │ undefined │ null │ NaN │ 0 │",
      "└──┴───────┴───────────┴──────┴─────┴───┘",
    ]

    table.toString().should.eql(expected.join("\n"))
  },

  "test table with function as value": () => {
    eval("function main () {\n  return 0\n}")
    const table = new Table({
      head: [main],
      style: {
        head: [],
        border: [],
      },
    })

    const expected = [
      "┌────────────────────┐",
      "│ function main () { │",
      "│   return 0         │",
      "│ }                  │",
      "└────────────────────┘",
    ]

    table.toString().should.eql(expected.join("\n"))
  },
}
