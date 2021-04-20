import { DOM } from "../../constants";
import { slideDown, slideUp } from "../../lib/utils";

class WooCatWidget {
    constructor() {
        this.#start();
    }

    #start = () => {
        DOM.woo.categories.forEach((category) => {
            category.querySelectorAll("li").forEach((li) => {
                const hasChildrenElem = Array.from(li.querySelectorAll(".children")).length !== 0;
                const hasListElem = Array.from(li.querySelectorAll("li")).length !== 0;
                const angleDownIcon = '<i class="fa fa-angle-down"></i>';
                const angleUpIcon = '<i class="fa fa-angle-up"></i>';

                if (hasChildrenElem && hasListElem) {
                    category.insertAdjacentHTML(
                        "afterbegin",
                        `<div class="open-this">${angleDownIcon}</div>`
                    );
                }

                category.querySelectorAll(".open-this")?.forEach((item) => {
                    item.addEventListener("click", (event) => {
                        const parentItem = item.parentNode;
                        const parentItemChildren = parentItem.children;

                        if (parentItem.classList.contains("opened")) {
                            item.innerHTML = angleDownIcon;
                            parentItem.classList.remove("opened");

                            for (let i = 0; i < parentItemChildren.length; i++) {
                                const element = parentItemChildren[i];

                                if (element.nodeName === "ul") {
                                    slideUp(element, 200);
                                }
                            }
                        } else {
                            item.innerHTML = angleUpIcon;
                            parentItem.classList.add("opened");

                            for (let i = 0; i < parentItemChildren.length; i++) {
                                const element = parentItemChildren[i];

                                if (element.nodeName === "ul") {
                                    slideDown(element, 200);
                                }
                            }
                        }
                    });
                });
            });
        });
    };
}

new WooCatWidget();
