const toString = (arg: string | number): string => {
  return arg.toString()
}

export const sql = (statement?: string, args?: (string | number)[]) => {
  const allArgs: string[] = []

  const replaceStatementArgs = (statement: string) => {
    let index = 0
    return statement.replace(/\$/g, () => {
      // get index of $ in statement
      index++
      return `$${allArgs.length + index}`
    })
  }

  const statements: string[] = [replaceStatementArgs(statement ?? '')]
  args && args.forEach((arg) => allArgs.push(toString(arg)))

  const add = (statement: string, args?: (string | number)[]) => {
    // push statement to statements
    statements.push(replaceStatementArgs(statement))
    // push args to args
    args && args.forEach((arg) => allArgs.push(toString(arg)))

    return {
      add,
      get statement() {
        return statements.join(' ')
      },
      get args() {
        return allArgs.slice()
      },
    }
  }

  return {
    add,
    get statement() {
      return statements.join(' ')
    },
    get args() {
      return allArgs.slice()
    },
  }
}
