namespace Form {
    window.addEventListener("load", init);

    let flavors: string[] = ["Chocolate", "Strawberry", "Vanilla", "Cinnamon"];
    let toppings: string[] = ["Chocolate Chips", "Strawberries", "Maple Syrup"];
    let containers: string[] = ["Waffle Cone", "Cup"];
    let flavorSelections = document.getElementsByName("Select");
    let scoopPrice: number = 1;
    let toppingPrice: number = 0.4;
    let sum: number = 0;
    let flavorInputs: string[] = [];
    let toppingInputs: string[] = [];
    let scoopNumber: number = 0;


    function init(_event: Event): void {
        console.log("Init");
        let fieldsets: NodeListOf<HTMLFieldSetElement> = document.getElementsByTagName("fieldset");

        //EventListener an fieldsets
        for (let i: number = 0; i < fieldsets.length; i++) {
            let fieldset: HTMLFieldSetElement = fieldsets[i];
            fieldset.addEventListener("change", handleChange);
        }
        createContainerField();
    };


    //ausgewählte Eissorten & Toppings in Cart schreiben
//    for (let i: number = 0; i < flavorInputs.length; i++) {
//        document.getElementById("products").textContent = flavorInputs[i];
//    }
//    for (let i: number = 0; i < toppingInputs.length; i++) {
//        document.getElementById("products").textContent = toppingInputs[i];
//    }

    function calculatePrice(_event: Event): void {
        scoopNumber += parseInt(this.value);
        sum = scoopNumber*scoopPrice + toppingInputs.length * 0.4;;
        document.getElementById("total").textContent = "" + sum;
        console.log(scoopNumber);
    }

    function displayFlavorInput(_event: Event): void {
        
        flavorInputs.push(this.value);
       
        for (let i: number = 0; i < flavorInputs.length; i++) {
        document.getElementById("products").innerHTML += flavorInputs[i] + "<br>";
    }
        console.log(flavorInputs);
    }

    function handleToppingInput(_event: Event): void {
        let target: HTMLInputElement = <HTMLInputElement>_event.target;
        console.log("Changed " + target.name + " to " + target.value);
        toppingInputs.push(target.value);
        console.log(toppingInputs);
    }
    

    function handleChange(_event: Event): void {
        //console.log(_event);
        //*/
        let target: HTMLInputElement = <HTMLInputElement>_event.target;
        console.log("Changed " + target.name + " to " + target.value);

        //*/
        //*/ note: this == _event.currentTarget in an event-handler

        if (this.id == "toppings") {
            console.log("Changed " + target.name + " to " + target.value);
        }
        //*/
        //*/
        if (target.name == "Slider") {
            let progress: HTMLProgressElement = <HTMLProgressElement>document.getElementsByTagName("progress")[0];
            progress.value = parseFloat(target.value);
        }
        //*/
        //*/
        if (target.name == "Stepper") {
            let progress: HTMLProgressElement = <HTMLProgressElement>document.getElementsByTagName("meter")[0];
            progress.value = parseFloat(target.value);
        }
    }


    function createContainerField(): void {
        let containerField = document.createElement("fieldset");
        containerField.id = "radio";
        let mainDiv = document.getElementById("main");
        mainDiv.appendChild(containerField);

        //Legende für containerField
        let legend = document.createElement("legend");
        legend.innerText = "Cone or Cup?";
        containerField.appendChild(legend);

        //Behälter-Optionen für Array-Einträge
        for (let i: number = 0; i < containers.length; i++) {
            let container = document.createElement("input");
            container.type = "checkbox";
            container.value = containers[i];
            container.name = "Checkbox" + i+1;
            containerField.appendChild(container);

            //Labels für Behälterauswahl
            let containerLabel = document.createElement("label");
            containerLabel.textContent = containers[i];
            containerLabel.htmlFor = "radio" + i + 1;
            containerField.appendChild(containerLabel);
            container.addEventListener("change", handleChange);//listener an Auswahl
        }

        //scoopButton erstellen
        let scoopButton = document.createElement("button");
        scoopButton.type = "button";
        scoopButton.name = "ScoopButton";
        scoopButton.className = "addScoop";
        scoopButton.innerText = "Add Scoop";
        containerField.appendChild(scoopButton);

        addListenerToScoopButton();
    }


    function createFlavorField(): void {
        //flavorField erstellen
        let flavorField = document.createElement("fieldset");
        flavorField.className = "flavorField";
        let mainDiv = document.getElementById("main");
        mainDiv.appendChild(flavorField);

        //Legende
        let legend = document.createElement("legend");
        legend.innerText = "Choose Your Flavors";
        flavorField.appendChild(legend);

        //Select-Form
        let flavorSelection = document.createElement("select");
        flavorSelection.name = "Select";
        flavorSelection.id = "flavorSelection";
        flavorField.appendChild(flavorSelection);

        //Optionen für Array-Einträge
        for (let i: number = 0; i < flavors.length; i++) {
            let flavor = document.createElement("option");
            flavor.value = flavors[i];
            flavor.text = flavors[i];
            flavorSelection.appendChild(flavor);
        }

        //Number-Feld für Eiskugel-Anzahl
        let scoopNumber = document.createElement("input");
        scoopNumber.type = "number";
        scoopNumber.name = "scoopNumber";
        scoopNumber.step = "1";
        scoopNumber.min = "1";
        scoopNumber.max = "5";
        scoopNumber.value = "0";
        flavorField.appendChild(scoopNumber);

        //toppingButton erstellen
        let toppingButton = document.createElement("button");
        toppingButton.type = "button";
        toppingButton.name = "ToppingButton";
        toppingButton.className = "addTopping";
        toppingButton.innerText = "Add Topping";
        flavorField.appendChild(toppingButton);

        //EventListenser an toppingButtons
        let toppingButtons: NodeListOf<Element> = document.getElementsByClassName("addTopping");
        for (let i: number = 0; i < toppingButtons.length; i++) {
            let toppingButton = toppingButtons[i];
            toppingButton.addEventListener("click", createToppingField);
        }
        flavorSelection.addEventListener("change", displayFlavorInput);//eventListener an flavorSelect-Feld
        flavorSelection.addEventListener("change", handleChange);//eventListener an flavorSelect-Feld
        
        scoopNumber.addEventListener("change", handleChange);//eventListener an scoopNumber-Feld
        scoopNumber.addEventListener("change", calculatePrice);
        
    }//createFlavorField

    function createToppingField(): void {

        //toppingField erstellen
        let toppingField = document.createElement("fieldset");
        toppingField.id = "toppings";
        let mainDiv = document.getElementById("main");
        mainDiv.appendChild(toppingField);

        //Legende
        let legend = document.createElement("legend");
        legend.innerText = "Add Your Toppings";
        toppingField.appendChild(legend);

        //checkbox für Array-Einträge
        for (let i: number = 0; i < toppings.length; i++) {
            let topping = document.createElement("input");
            topping.type = "checkbox";
            topping.value = toppings[i];
            topping.name = "Checkbox" + i;
            toppingField.appendChild(topping);

            //Label für checkboxen
            let toppingLabel = document.createElement("label");
            toppingLabel.textContent = toppings[i];
            toppingLabel.htmlFor = topping.name;
            toppingField.appendChild(toppingLabel);
            topping.addEventListener("change", handleToppingInput);
        }

        //scoopButton
        let scoopButton = document.createElement("button");
        scoopButton.type = "button";
        scoopButton.name = "ScoopButton";
        scoopButton.className = "addScoop";
        scoopButton.innerText = "Add Scoop";
        toppingField.appendChild(scoopButton);

        addListenerToScoopButton();
    }

    function addListenerToScoopButton(): void {
        let scoopButtons: NodeListOf<Element> = document.getElementsByClassName("addScoop");

        for (let i: number = 0; i < scoopButtons.length; i++) {
            let scoopButton = scoopButtons[i];
            scoopButton.addEventListener("click", createFlavorField);
        }
    }

} //namespace