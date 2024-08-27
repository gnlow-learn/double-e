const u = "u"
const b = "b"

type Tree = (string | Tree)[] 

const operators: string[] = []
const operands: Tree = []

let state: "u" | "b" = u

const last =
<A>(as: A[]) =>
    as[as.length - 1]

const prec = [
    "+u",
    "*b",
    "+b",
    "(",
]

const isPrecede =
(a: string, b: string) =>
    prec.indexOf(a) < prec.indexOf(b)

const input = "+(a+b)*c;".split("")

input.forEach(char => {
    console.log("state:", state)
    console.log(operators)
    console.log(operands)
    console.log("input:", char, "\n")
    if (state == u) {
        if (char == "+" || char == "*") {
            operators.push(char+u)
        } else if (char == "(") {
            operators.push(char)
        } else {
            operands.push(char)
            state = b
        }
    }
    if (state == b) {
        if (char == "+" || char == "*") {
            const x: Tree = []
            while (last(operators) && !isPrecede(char+b, last(operators))) {
                x.push(operands.pop()!)
                x.push(operators.pop()!)
            }
            if (x.length) {
                if ((last(x) as string).endsWith("b")) {
                    x.push(operands.pop()!)
                }
                operands.push(x.reverse())
            }
            operators.push(char+b)
            state = u
        } else if (char == ")") {
            const x: Tree = []
            while (last(x) != "(") {
                x.push(operands.pop()!)
                x.push(operators.pop()!)
            }
            x.pop()
            operands.push(x.reverse())
        } else if (char == "(") {
            //func
            operators.push(char)
            state = u
        } else if (char == ";") {
            while (last(operators)) {
                const x: Tree = []
                x.push(operands.pop()!)
                x.push(operators.pop()!)
                x.push(operands.pop()!)
                operands.push(x.reverse())
            }
        }
    }
})

console.log(operands)
