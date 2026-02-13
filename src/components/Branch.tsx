import React from 'react'

interface BranchProps {
  branch: string
}

const Branch = ({ branch }: BranchProps) => {
  return (
    <>
      <div className="fixed p-4 bottom-0 right-0 bg-color-op rounded-3xl m-6 z-50">{branch}</div>
    </>
  )
}

export default Branch