import React from "react";
import Child from "./Child";

export default function Parent({teams}) {
  return (
    <>
      <Child score={"2-3"} home={"spur"} away={"arsenal"} />
      {teams.map(e =>{
        return(RenderTeam(e))
      })}
    </>
  );
}

function RenderTeam(name,i){
  return(
    <div key={`${i}`}>
    {i+1}:{name}
    </div>
  )
}
