/* 
    pointer.js was created by OwL and Nepomuc for use on websites.
*/

const init_pointer = (options) => {
    
    const isTouchDevice = () => {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    }
    
    if (!isTouchDevice()) {
        
        let mouseX = -100
        let mouseY = -100
        let ringX = -100
        let ringY = -100
        let isHover = false
        let mouseDown = false
        let mouseNeverMovedYet = true
        
        const pointer = document.createElement("div")
        pointer.id = "pointer-dot"
        const ring = document.createElement("div")
        ring.id = "pointer-ring"

        const trace = (a, b, n) => {
            return (1 - n) * a + n * b;
        }
        window["trace"] = trace

        const getOption = (option) => {
            let defaultObj = {
                pointerFollowStiffness: 0.2,
                pointerSize: 2.5,
                pointerColor: "grey",
                pointerBoxShadow: "0px 0px 0px 1px #FFFFFF",
                ringOutlineColor: "grey",
                ringInsideSize: 15,
                ringInsideColor: "tansparent",
                ringBoxShadow: "0px 0px 0px 1px #FFFFFF",
                ringOutlineSize: 2,
                ringOutlineStyle: "solid",
                ringInsideSizeClick: (options["ringInsideSize"] || 15) - 5,
            }
            if (options[option] == undefined) {
                return defaultObj[option]
            } else {
                return options[option]
            }
        }

        const getRingTransformOffset = () => {
            return (mouseDown ? getOption("ringInsideSizeClick")/2+getOption("ringOutlineSize") : getOption("ringInsideSize")/2+getOption("ringOutlineSize"))
        }

        const ringUpdatePosition = (x,y) => {
            ring.style.transform = `translate(${x - getRingTransformOffset()}px, ${y - getRingTransformOffset()}px)`
        }

        const pointerUpdatePosition = (x,y) => {
            pointer.style.transform = `translate(${x-getOption("pointerSize")/2}px, ${y-getOption("pointerSize")/2}px)`
        }

        window.onmousemove = (mouse) => {
            mouseX = mouse.clientX
            mouseY = mouse.clientY
            if(mouseNeverMovedYet) {
                mouseNeverMovedYet = false
                pointerUpdatePosition(mouseX,mouseY)
                ringX = mouseX
                ringY = mouseY
                ringUpdatePosition(ringX,ringY)
                requestAnimationFrame(render)
            }
        }

        window.onmousedown = (mouse) => {
            mouseDown = true
        }

        window.onmouseup = (mouse) => {
            mouseDown = false
        }

        const render = () => {
            ringX = trace(ringX, mouseX, getOption("pointerFollowStiffness"))
            ringY = trace(ringY, mouseY, getOption("pointerFollowStiffness"))

            if (mouseDown) {
                ring.style.padding = getOption("ringInsideSizeClick")/2 + "px"
                ring.style.borderRadius = getOption("ringInsideSizeClick")+getOption("ringOutlineSize") + "px"
            } else {
                ring.style.padding = getOption("ringInsideSize")/2 + "px"
                ring.style.borderRadius = getOption("ringInsideSize")+getOption("ringOutlineSize") + "px"
            }            

            pointerUpdatePosition(mouseX,mouseY)
            ringUpdatePosition(ringX,ringY)

            requestAnimationFrame(render)
        }

        document.body.style.cursor = "none"
        document.body.insertBefore(pointer, document.body.children[0])
        document.body.insertBefore(ring, document.body.children[0])

        pointer.style.padding = getOption("pointerSize")/2 + "px"
        pointer.style.borderRadius = getOption("pointerSize") + "px"
        pointer.style.borderColor = getOption("pointerColor")
        pointer.style.backgroundColor = getOption("pointerColor")
        pointer.style.boxShadow = getOption('pointerBoxShadow')
        
        ring.style.backgroundColor = getOption("ringInsideColor")
        ring.style.borderWidth = getOption("ringOutlineSize") + "px"
        ring.style.borderColor = getOption("ringOutlineColor")
        ring.style.borderStyle = getOption("ringOutlineStyle")
        ring.style.boxShadow = getOption('ringBoxShadow')
    }
}
