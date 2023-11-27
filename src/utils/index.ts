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

export function updateCssStyles(colors: string[]) {
  document.documentElement.style.setProperty('--legis-color-1', `${colors[0]}`);
  document.documentElement.style.setProperty('--legis-color-2', `${colors[1]}`);
  document.documentElement.style.setProperty('--legis-color-3', `${colors[2]}`);
}

export function switchIcon(valueName: string) {
  switch(valueName.toLocaleLowerCase()) {
    case 'reliability': return "bi bi-clock";
    case 'loyalty & trust': return "bi bi-key";
    case 'integrity': return "bi bi-shield";
    case 'excellence': return "bi bi-star";
    case 'collaboration': return "bi bi-people";
    default: return "bi bi-check";
  }
}

export function getUrl(uuid: string) {
  return `https://ucarecdn.com/${uuid}/`;
}

export function getRandomTemplate(category: string) {
  switch (category) {
    
  }
}

export function switchTemplateSet(template_set_id: string) {
  switch(template_set_id) {
    case 'casual-light': return ['LHero2', 'LPracticeAreas1', 'LValues3', 'LTeam2', 'LReviews3', 'LAbout3', 'LContact2'];
    default: case 'generic-dark': return ['LHero1', 'LPracticeAreas2', 'LValues2', 'LTeam1', 'LReviews1', 'LAbout1', 'LContact1'];
  }
}

export function getBodyTemplateFromTemplateSetId(templateIds: string[]) {
  return Array(7).fill({}).map((_, i: number) => i < templateIds.length ? ({template_id: templateIds[i]}) : ({}));
}

export function camelCase(str: string) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}
console.log(camelCase("Click the button to convert to camelCase"));