import { Button } from '@/components/design/button';
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import React from 'react';

export function NewThreadButton() {
  return (
    <Button 
// @ts-ignore
    withIcon to="/threads/new">
      <VscGitPullRequestNewChanges />
      Thread Baru
    </Button>
  );
}
