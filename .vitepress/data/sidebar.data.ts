
import { personaSidebar, generateEnhancedDocsSidebar } from '../theme/docs-sidebar.ts'

//https://vitepress.dev/guide/data-loading#build-time-data-loading
export default{
    load() {
        return {
            usersSidebar: personaSidebar('Users')['/docs/'],
            developersSidebar: personaSidebar('Developers')['/docs/'],
            operatorsSidebar: personaSidebar('Operators')['/docs/'],
            all : generateEnhancedDocsSidebar()['/docs/']
        }
    }
}