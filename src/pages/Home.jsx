'use client'

import Recognition from "../Components/Recognition"

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Contact', href: '/contact' },
]

export default function Home() {
  return (
    <>
        <header className="bg-white">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
                <div className="flex-1">
                    <div className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                        alt=""
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                        className="h-8 w-auto"
                        />
                    </div>
                </div>
                <div className="flex gap-x-12">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
                            {item.name}
                        </a>
                    ))}
                </div>
            </nav>
        </header>
        <main className="bg-gray-50">
            <Recognition />
        </main>
    </>
  )
}
