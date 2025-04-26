/**
 * Module requirements.
 */

require("should")

var Table = require("../")

/**
 * Tests.
 */

module.exports = {
  "test table with newlines in headers": function () {
    var table = new Table({
      head: ["Test", "1\n2\n3"],
      style: {
        "padding-left": 1,
        "padding-right": 1,
        head: [],
        border: [],
      },
    })

    var expected = [
      "┌──────┬───┐",
      "│ Test │ 1 │",
      "│      │ 2 │",
      "│      │ 3 │",
      "└──────┴───┘",
    ]

    table.toString().should.eql(expected.join("\n"))
  },

  "test column width is accurately reflected when newlines are present":
    function () {
      var table = new Table({
        head: ["Test\nWidth"],
        style: { head: [], border: [] },
      })
      table.width.should.eql(9)
    },

  "test newlines in body cells": function () {
    var table = new Table({ style: { head: [], border: [] } })

    table.push(["something\nwith\nnewlines"])

    var expected = [
      "┌───────────┐",
      "│ something │",
      "│ with      │",
      "│ newlines  │",
      "└───────────┘",
    ]

    table.toString().should.eql(expected.join("\n"))
  },

  "test newlines in vertical cell header and body": function () {
    var table = new Table({
      style: { "padding-left": 0, "padding-right": 0, head: [], border: [] },
    })

    table.push({ "v\n0.1": "Testing\nsomething cool" })

    var expected = [
      "┌───┬──────────────┐",
      "│v  │Testing       │",
      "│0.1│something cool│",
      "└───┴──────────────┘",
    ]

    table.toString().should.eql(expected.join("\n"))
  },

  "test newlines in cross table header and body": function () {
    var table = new Table({
      head: ["", "Header\n1"],
      style: { "padding-left": 0, "padding-right": 0, head: [], border: [] },
    })

    table.push({ "Header\n2": ["Testing\nsomething\ncool"] })

    var expected = [
      "┌──────┬─────────┐",
      "│      │Header   │",
      "│      │1        │",
      "├──────┼─────────┤",
      "│Header│Testing  │",
      "│2     │something│",
      "│      │cool     │",
      "└──────┴─────────┘",
    ]

    table.toString().should.eql(expected.join("\n"))
  },

  "test newlines with different representation": function () {
    var table = new Table({
      style: { head: [], border: [] },
    })

    table.push(["Unix & Unix-like", "LF", "1\n2\n3"])
    table.push(["Windows & DOS", "CRLF", "1\r\n2\r\n3"])
    table.push(["Classic Mac OS", "CR", "1\r2\r3"])

    var expected = [
      "┌──────────────────┬──────┬───┐",
      "│ Unix & Unix-like │ LF   │ 1 │",
      "│                  │      │ 2 │",
      "│                  │      │ 3 │",
      "├──────────────────┼──────┼───┤",
      "│ Windows & DOS    │ CRLF │ 1 │",
      "│                  │      │ 2 │",
      "│                  │      │ 3 │",
      "├──────────────────┼──────┼───┤",
      "│ Classic Mac OS   │ CR   │ 1 │",
      "│                  │      │ 2 │",
      "│                  │      │ 3 │",
      "└──────────────────┴──────┴───┘",
    ]

    table.toString().should.eql(expected.join("\n"))
  },
}
