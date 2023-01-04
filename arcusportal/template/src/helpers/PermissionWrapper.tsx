import { AuthenticationClient } from '@arcus-core/web-core-utilities'
import React, { ReactNode, useEffect, useState } from 'react'

interface IProps {
  permission: Array<string>
  children: ReactNode
}

const PermissionWrapper: React.FC<IProps> = ({ permission, children }) => {
  const [status, setStatus] = useState<boolean>(false);
  useEffect(() => {
    setStatus(permission.some(role => AuthenticationClient.hasRole(role)));
  }, [permission]);
  return status ? <>{children}</> : null;
}

export default PermissionWrapper;
