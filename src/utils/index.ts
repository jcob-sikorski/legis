import PROFILES from '../components/templates/profiles.json';
import PROFILES_METADATA_MAP from '../components/templates/profiles_metadata_map.json'

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