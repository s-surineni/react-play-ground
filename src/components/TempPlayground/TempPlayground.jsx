export default function TempPlayground() {
  return (<><File name={`hello`}/><Folder /></>)
}

function File({name}) {
  return <>📄 {name}</>;
}

function Folder() {
  return <>📁</>
}