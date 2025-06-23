export const GetAllTags = () => {
    return fetch("http://localhost:8000/tags").then(res => res.json())
}
console.log(GetAllTags())
export const addTag = (newTag) => {
    return fetch("http://localhost:8000/tags", {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({label: newTag})
    })
}