export const sections = {
 work: {
  title: 'Selected work',
  description: 'Explore what OOYI has built and what is still in development.',
  entries: [
   { slug:'fieldnotes', title:'Fieldnotes', status:'Working prototype', summary:'Turn a list of actions into editable tasks and retain the original source.', body:['The browser workspace accepts your own notes and creates one draft task per line. In the demo below, you can edit each task and mark it complete while keeping the original wording visible.','Try the workspace to verify the workflow for yourself. Drafting uses fixed rules and the data stays in your browser.'], href:'/#studio', action:'Try Fieldnotes' },
   { slug:'city-sheba', title:'City Sheba', status:'In development', summary:'A civic platform for Hajiganj, beginning with blood donor discovery.', body:['The project brings together an Expo mobile app, a Next.js web app, and a shared Express API.','The donor profile module is implemented in the API. The blood request workflow is in development. Public launch and adoption figures are yet to be documented.'] }
  ]
 },
 journal: {
  title:'Build journal',
  description:'Practical engineering notes and decisions from OOYI’s work.',
  entries:[
   {slug:'keep-the-source-attached',title:'Keep the source attached',status:'Engineering note',summary:'Why a task draft should keep the original note within reach.',body:['A draft task can lose context when someone shortens or rewrites it. Fieldnotes stores the original line separately from the editable title so the reviewer can compare both.','Try this with a line that names a reviewer without naming an owner. The draft gives you a place to clarify responsibility before sharing or exporting it.'],href:'/#studio',action:'Try the workflow'},
   {slug:'share-an-api-across-mobile-and-web',title:'One API for mobile and web',status:'Architecture note',summary:'Where to put shared rules when two apps use the same data.',body:['City Sheba’s mobile and web clients share an Express API. Put authorization and validation in the API so every client follows the same rules.','For example, the API should determine whether a signed-in user has a donor profile before letting them create a donation organization. Each client can explain the requirement in its own interface.']}
  ]
 },
 partners: {
  title:'Partnerships',
  description:'Ways to work with OOYI on product research and pilots.',
  entries:[
   {slug:'product-pilots',title:'Product pilots',status:'Collaboration',summary:'Work with OOYI to test an early product in a real workflow.',body:['A pilot starts with a specific workflow, a small group of participants, and a clear way to assess whether the product helps.','OOYI’s public partner directory will list confirmed collaborations when they are ready to share.']}
  ]
 }
};
