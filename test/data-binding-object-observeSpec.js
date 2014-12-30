/**
 * @license data-binding-object-observe https://github.com/...tbd..
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
 */
"use strict";

require("quick-dom");

var expect = require("chai").expect;
var asap = require("asap");

GLOBAL.SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "ellipse").constructor;
GLOBAL.HTMLElement = document.body.constructor;

var DataBinding = require("../index"),
    SeamView = require("seam-view");

describe("Given DataBinding, a SeamView, an observed object", function () {

    var dataBinding = null,
        seamView = null,
        model,
        dispose;

    beforeEach(function () {
        // The object that we want to data bind to, also called the model
        model = {
            firstname: "Data"
        };
        // Then we create the data-binding plugin that will bind the object with the DOM
        dataBinding = new DataBinding(model);
        // And we add it to seam, which is our declarative way to add behavior to the DOM
        seamView = new SeamView();
        seamView.seam.addAll({
            "bind": dataBinding
        });
    });

    describe("And an html view with bindings", function () {

        var view = '<div>' +
            '<span data-bind="bind:innerHTML,firstname"></span>' +
            '<span data-bind="bind:innerHTML,lastname"></span>' +
            '</div>';

        describe("When applying dataBinding", function () {
            var dom;
            beforeEach(function () {
                seamView.template = view;
                seamView.render();
                dom = seamView.dom;
            });

            it("Then the view receives the model's data", function (done) {
                asap(function () {
                    expect(dom.querySelectorAll("span")[0].innerHTML).to.equal("Data");
                    expect(dom.querySelectorAll("span")[1].innerHTML).to.equal("");
                    done();
                });
            });

            describe("When properties are updated", function () {
                beforeEach(function () {
                    model.lastname = "Binding";
                });

                it("Then the view receives the model's data", function (done) {
                    asap(function () {
                        expect(dom.querySelectorAll("span")[0].innerHTML).to.equal("Data");
                        expect(dom.querySelectorAll("span")[1].innerHTML).to.equal("Binding");
                        done();
                    });
                });
            });

            describe("When properties are deleted", function () {
               beforeEach(function () {
                   delete model.firstname;
               });

                it("Then the view is updated", function (done) {
                    asap(function () {
                        expect(dom.querySelectorAll("span")[0].innerHTML).to.equal("");
                        done();
                    });
                });
            });
        });

    });

});