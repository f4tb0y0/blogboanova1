const query= `
query Test($navId:String!) {
    nvaigation(where:{navID: $navId}){
        id
        link {
            externalURL
            displayText
            page {
                ... on Page {
                    id
                    slug
                }
            }
        }
    navID
    
    }
}
`

const SingleNav = query
export {SingleNav}