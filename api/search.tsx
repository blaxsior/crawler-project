export async function getDefaultTag() {
  const data = await fetch('/tags?type=favorite');
  if(!data.ok) {
    return [];
  }
  return data.json();
  // zod 기반 validation 추가 필요
}

export async function getRelevantTag() {
  const data = await fetch('/tags?~(이하 내용)');
  if(!data.ok) {
    return [];
  }
  return data.json();
  // zod 기반 validation 추가
}

