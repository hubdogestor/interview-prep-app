import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Label } from './label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select'

const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Opção 1</SelectItem>
        <SelectItem value="option2">Opção 2</SelectItem>
        <SelectItem value="option3">Opção 3</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Selecione uma categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Competências Técnicas</SelectLabel>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="typescript">TypeScript</SelectItem>
          <SelectItem value="nodejs">Node.js</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Soft Skills</SelectLabel>
          <SelectItem value="leadership">Liderança</SelectItem>
          <SelectItem value="communication">Comunicação</SelectItem>
          <SelectItem value="teamwork">Trabalho em equipe</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-[250px] gap-1.5">
      <Label htmlFor="category">Categoria</Label>
      <Select>
        <SelectTrigger id="category">
          <SelectValue placeholder="Selecione uma categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="technical">Technical</SelectItem>
          <SelectItem value="soft_skills">Soft Skills</SelectItem>
          <SelectItem value="leadership">Leadership</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const IcebreakerType: Story = {
  render: () => (
    <div className="grid w-[300px] gap-1.5">
      <Label htmlFor="icebreaker-type">Tipo de Icebreaker</Label>
      <Select defaultValue="elevator_pitch">
        <SelectTrigger id="icebreaker-type">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="elevator_pitch">Elevator Pitch</SelectItem>
          <SelectItem value="quick_intro">Quick Intro</SelectItem>
          <SelectItem value="personal_story">Personal Story</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const CompetenciaLevel: Story = {
  render: () => (
    <div className="grid w-[250px] gap-1.5">
      <Label htmlFor="level">Nível de Conhecimento</Label>
      <Select defaultValue="intermediate">
        <SelectTrigger id="level">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="basic">Basic</SelectItem>
          <SelectItem value="intermediate">Intermediate</SelectItem>
          <SelectItem value="advanced">Advanced</SelectItem>
          <SelectItem value="expert">Expert</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}
