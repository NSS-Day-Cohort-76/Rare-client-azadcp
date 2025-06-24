export const getAllCategories = () => {
    return fetch(`http://localhost:8000/categories`)
    .then(res => res.json())
}

export const createCategory = (categoryData) => {
  return fetch("http://localhost:8000/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(categoryData)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to create category")
      }
      return res.json()
    })
}
