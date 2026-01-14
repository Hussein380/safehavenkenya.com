import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
    api: {
        projectId: '8n2w9qjw',
        dataset: 'production'
    },
    studio: {
        /* 
         * This is highly recommended to avoid prompting for application id on next deploy 
         * and to ensure you are deploying to the correct studio.
         */
        appId: 'vblid4bqfva4bgf6ei2eawcf',
    }
})
