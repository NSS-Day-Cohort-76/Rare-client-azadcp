export const getAllCategories = () => {
    return fetch(`http://localhost:8000/categories`)
    .then(res => res.json())
}

export const addCategory = (categoryData) => {
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

export const deleteCategory = (id) => {
  return fetch(`http://localhost:8000/categories/${id}`, {
    method: "DELETE"
  })
}

export const updateCategory = (id, categoryData) => {
  return fetch(`http://localhost:8000/categories/${id}`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  })
}

export const getCategoryById = (id) => {
  return fetch(`http://localhost:8000/categories/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch category")
      }
      return res.json()
    })
}
