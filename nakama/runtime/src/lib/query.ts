/**
 * This function is used to convert bytes to an object.
 */
const bytesToObject = (nk: nkruntime.Nakama, buf: Uint8Array) => {
	return JSON.parse(nk.binaryToString(buf))
}

/**
 * This utility function is used to run a SQL query.
 * Use it together with the utility `sql`.
 */
export const run = (nk: nkruntime.Nakama, query, params) => {
	const result = nk.sqlQuery(query, params)
	result.forEach((object) => {
		object.value = bytesToObject(nk, object.value)
	})
	return result
}
