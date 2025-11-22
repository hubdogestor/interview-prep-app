import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Textarea } from './textarea'
import { Label } from './label'

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Digite sua mensagem...',
    className: 'w-[350px]',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Textarea desativada',
    disabled: true,
    className: 'w-[350px]',
  },
}

export const WithValue: Story = {
  args: {
    value: 'Este é um exemplo de texto dentro do textarea. Pode ser usado para descrições longas ou conteúdos maiores.',
    className: 'w-[350px]',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-[350px] gap-1.5">
      <Label htmlFor="message">Mensagem</Label>
      <Textarea id="message" placeholder="Digite sua mensagem aqui..." />
    </div>
  ),
}

export const WithCharacterCount: Story = {
  render: () => (
    <div className="grid w-[350px] gap-1.5">
      <Label htmlFor="description">Descrição</Label>
      <Textarea
        id="description"
        placeholder="Descreva sua experiência..."
        maxLength={500}
      />
      <p className="text-sm text-muted-foreground text-right">0 / 500</p>
    </div>
  ),
}

export const LongContent: Story = {
  render: () => (
    <div className="grid w-[500px] gap-1.5">
      <Label htmlFor="content">Conteúdo</Label>
      <Textarea
        id="content"
        rows={10}
        value={`Olá! Meu nome é João Silva e sou desenvolvedor full-stack com mais de 5 anos de experiência.

Durante minha carreira, trabalhei em diversos projetos utilizando tecnologias como React, Node.js, TypeScript e MongoDB.

Atualmente, busco oportunidades onde possa aplicar minhas habilidades em liderança técnica e arquitetura de sistemas escaláveis.`}
      />
    </div>
  ),
}
