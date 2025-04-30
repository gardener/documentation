document.querySelectorAll(".taxonomy-term").forEach((el) => {
    el.addEventListener("click",(event) => {
      const roleSelected = event.currentTarget.innerHTML
      window.sessionStorage.setItem("role_selected",roleSelected)
      location.reload()
    })
  })
  const taxonomyTerms = Array.from(document.querySelectorAll(".taxonomy-term"))
  taxonomyTerms
    .filter(tt => tt.innerHTML.includes(window.sessionStorage.getItem("role_selected")))
    .map(tt => tt.setAttribute("class","taxonomy-term selectedTaxonomy"))


//filtering section
const roleSelected = window.sessionStorage.getItem("role_selected")
const sectionEntries = document.querySelectorAll(".section-index .entry-roles")

if(roleSelected == null || roleSelected == "All"){
  sectionEntries.forEach((el) => {
    const entry = el.parentElement.parentElement.parentElement
    entry.style.display = "block"
  })
}
else {
  sectionEntries.forEach((el) => {
    let elRoles = Array.from(el.querySelectorAll("i")).map(iel => iel.innerHTML)
    const entry = el.parentElement.parentElement.parentElement
    if(!elRoles.includes(roleSelected)){
      entry.style.display = "none"
    }else {
      entry.style.display = "block"
    }
  })
} 

//filtering tree
const selectedRole = window.sessionStorage.getItem("role_selected")
if(selectedRole && selectedRole!="All"){
    const nav = document.querySelector("#td-section-nav > ul > li > ul")
    const navItems = nav.querySelectorAll("li")
    navItems.forEach(item => item.setAttribute("style","display: none"))
    navItems.forEach(item => {
        const labels = Array.from(item.querySelectorAll(":scope > .category-label"))
        if (labels.length ==0 || labels.filter(role => role.innerHTML == selectedRole).length > 0){
            item.setAttribute("style","")
        }
    })
}