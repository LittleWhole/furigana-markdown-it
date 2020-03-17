"use strict";

const assert = require("assert");
const md = require("markdown-it")().use(require("../index"));

describe("furigana_plugin", function() {
  it("should parse basic [kanji]{furigana}", function() {
    assert.equal(
      md.renderInline("[漢字]{かんじ}"),
      "<ruby>漢字<rp>【</rp><rt>かんじ</rt><rp>】</rp></ruby>"
    );
  });

  it("should parse single [kanji]{furigana} in a sentence", function() {
    assert.equal(
      md.renderInline("Foo [漢字]{かんじ} bar."),
      "Foo <ruby>漢字<rp>【</rp><rt>かんじ</rt><rp>】</rp></ruby> bar."
    );
  });

  it("should parse multiple [kanji]{furigana} in a sentence", function() {
    assert.equal(
      md.renderInline("Foo [漢字]{かんじ} bar [猫]{ねこ} baz."),
      "Foo <ruby>漢字<rp>【</rp><rt>かんじ</rt><rp>】</rp></ruby> bar <ruby>猫<rp>【</rp><rt>ねこ</rt><rp>】</rp></ruby> baz."
    );
  });

  it("should ignore empty body", function() {
    assert.equal(md.renderInline("[]{ねこ}"), "[]{ねこ}");
    assert.equal(md.renderInline("[ ]{ねこ}"), "[ ]{ねこ}");
  });

  it("should ignore empty toptext", function() {
    assert.equal(md.renderInline("[猫]{}"), "[猫]{}");
    assert.equal(md.renderInline("[猫]{ }"), "[猫]{ }");
  });

  it("formats the body", function() {
    assert.equal(
      md.renderInline("[\\[*foo*\\]]{bar}"),
      "<ruby>[<em>foo</em>]<rp>【</rp><rt>bar</rt><rp>】</rp></ruby>"
    );
  });
});