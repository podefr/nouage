/**
 * @license data-binding-object-observe https://github.com/...tbd..
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
 */
"use strict";

require("quick-dom");

GLOBAL.SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "ellipse").constructor;
GLOBAL.HTMLElement = document.body.constructor;

var DataBinding = require("../index"),
    SeamView = require("seam-view"),
    observePlus = require("observe-plus");

describe("Given DataBinding AND Seam AND an observed object", function () {

    var dataBinding = null,
        seamView = null,
        model,
        dispose;

    beforeEach(function () {
        // The object that we want to data bind to, also called the model
        model = {};
        // We wrap it with observe+ which is based on the powerful Object.observe from ES7
        dispose = observePlus.observeObject(model);
        // Then we create the data-binding plugin that will bind the object with the DOM
        dataBinding = new DataBinding();
        // And we add it to seam, which is our declarative way to add behavior to the DOM
        seamView = new SeamView();
        seamView.seam.addPlugins({
            "bind": dataBinding
        });
    });

    describe("And an html view with bindings", function () {

        var view = '<div>' +
            '<span data-bind="bind:innerHTML,firstname"></span>' +
            '<span data-bind="bind:innerHTML,lastname"></span>' +
            '</div>';

        describe("When applying dataBinding", function () {
            beforeEach(function () {
                document.body.appendChild(view);
                seamView.alive(document.querySelector("div"));
            });

            it("Then the view receives the model's data", function () {
                expect(document.querySelectorAll("span")[0].innerHTML).toBe("");
                expect(document.querySelectorAll("span")[1].innerHTML).toBe("");
            });

            describe("When values are set", function () {
                beforeEach(function () {
                    model.firstname = "Data";
                    model.lastname = "Binding";
                });

                it("Then the view receives the model's data", function () {
                    expect(document.querySelectorAll("span")[0].innerHTML).toBe("Data");
                    expect(document.querySelectorAll("span")[1].innerHTML).toBe("Binding");
                });
            });
        });

    });

});