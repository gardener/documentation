
import { personaSidebar } from '../theme/utils/docs-sidebar.ts'

//https://vitepress.dev/guide/data-loading#build-time-data-loading
export default{
    load() {
        return {
            usersSidebar: personaSidebar('Users'),
            developersSidebar: personaSidebar('Developers'),
            operatorsSidebar: personaSidebar('Operators')
        }
    }
}