import { DataNode } from 'antd/es/tree';
import PROFILES from '../components/templates/profiles.json';
import PROFILES_METADATA_MAP from '../components/templates/profiles_metadata_map.json'
import { JSONProfile, JSONProfileField, OnboardingData } from '../models';
import { EditOutlined, FrownFilled, FrownOutlined } from '@ant-design/icons';
import { v4 } from 'uuid';

async function copyTextToClipboard(text: any) {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(text);
    } else {
      document.execCommand('copy', true, text);
    }
  }

  export function groupProfilesByCategory() {
    const profiles: any = PROFILES;
    const categoriesMap: any = PROFILES_METADATA_MAP.category;

    let groups: any = {};
    Object.keys(profiles)?.map((profileKey: string) => {
      const profile: any = profiles[profileKey];
      const category: string = profile.metadata.category;
      if(category in groups) {
        groups[category].profiles.push({...profile, id: profileKey});
      } else {
        groups[category] = {
          label: categoriesMap[category],
          profiles: [{...profile, id: profileKey}]
        };
      }
    })
    return groups;
  }

  export function convertTemplateIdToLabel(template_id: string) {
    if (template_id.includes("Contact")) return PROFILES_METADATA_MAP.category.contact 
    if (template_id.includes("Hero")) return PROFILES_METADATA_MAP.category.hero
    return "[NO TEMPLATE LABEL]"
  }

  export function convertDataToDataNodes(data: any, scrollToElement: any) {
    let treeData: DataNode[] = [];

    data.map((d: any) => {
      const newDataNode: DataNode = {
        key: 'tree-' + d.section_id,
        title: convertTemplateIdToLabel(d.template_id),
        children: Object.keys(d).map((k: string) => {
          const childDataNode: DataNode = {
            key: 'tree-' + d.section_id + k,
            title: k
          } 
          return childDataNode
        }),
      }

      treeData.push(newDataNode);
    } )

    return treeData;
  }

export function getGenerativeFieldsFromTemplateId(template_id: string) {
  // const template_id = "THero1";
  const profiles: any = PROFILES;
  const profile = profiles[template_id]
  const fields = profile.fields;

  return fields.filter(({generative}: JSONProfileField) => generative && generative > 0)
}

// templateIds is just a list of template_ids in strings nothing else. 
// E.g. ["THero1", "TContact3", ...] - selected during the onboarding process

export function getPromptForGeneration(onboardingData: OnboardingData) {


  let data: any = [];

  onboardingData.templateIds.map((template_id: string) => {
    const generativeFields = getGenerativeFieldsFromTemplateId(template_id)
    
    let promptFields: any = {}
    generativeFields.map(({id}: JSONProfileField) => promptFields[id] = '[FILL]')

    data.push({
      section_id: v4(),
      template_id,
      ...promptFields,
    })
  })

  const prompt = `
      Hey chatgpt. Given that my client is a ${onboardingData.lawyerField} lawyer, I want you to create labels for the wireframes of each section of a website.
      Fill out brackets with created and adequate labels in this JSON file:
      ${JSON.stringify(data)}
  `
  console.log("prompt: ", prompt)
}
