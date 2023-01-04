/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import XText from "apps/web-portal/src/components/XText";
import React from "react";

const TaskManager : React.FC = () => {
  return (
    <XText size={24} weight={700} text={'This is an example module for Arcus Portal'} />
  )
}

export default TaskManager