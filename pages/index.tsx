import React from "react"
import { readdir } from "fs/promises"
import { InferGetStaticPropsType } from "next"

import { config } from "../lib/config"
import { getContent, getPosts } from "../lib/api"

import VideoImage from "/public/video.png"

// import KikV from "/public/use-cases/kik-v.png"
// import ZorgInzage from "/public/use-cases/zorginzage.png"
// import eOverdracht from "/public/use-cases/eOverdracht.png"
// import BabyConnect from "/public/use-cases/baby-connect.png"
// import KikVSm from "/public/use-cases/sm/kik-v.png"
// import ZorgInzageSm from "/public/use-cases/sm/zorginzage.png"
// import eOverdrachtSm from "/public/use-cases/sm/eOverdracht.png"
// import BabyConnectSm from "/public/use-cases/sm/baby-connect.png"

import Video from "../components/Video"
import Layout from "../components/Layout"
import Header from "../components/Header"
import UseCase from "../components/UseCase"
import Markdown from "../components/Markdown"
import Carousel from "../components/Carousel"
import YoutubeEmbed from "../components/YoutubeEmbed"
import { InputButton } from "../components/Button"

interface HomeProps extends InferGetStaticPropsType<typeof getStaticProps> {
}

function Heading({ children }: { children: React.ReactNode }) {
  return (<h2 className="font-redhat font-bold text-2xl md:text-3xl mb-6">{children}</h2>)
}

function Section({ children }: { children: React.ReactNode }) {
  return (<div className="container mx-auto py-8 md:py-24">{children}</div>)
}

export default function Home({ sections: { entrance, whatIsNuts, howDoesItWork, community, usecases, callToAction } }: HomeProps) {
  function submitNewsletter() {
  }

  return (
    <Layout>
      <Header>
        <div className="container mx-auto">
          <div className="md:grid grid-cols-2 mb-12 gap-24 mb-6 md:mb-24">
            <h1 className="font-redhat font-bold text-white text-3xl md:text-4xl mb-6">{entrance.meta["title"]}</h1>
            <div>
              <Markdown className="text-white font-inter mb-12 leading-relaxed" html={entrance.content} />
            </div>
          </div>

          <div className="-mb-[120px] md:px-12 md:-mb-[300px]">
            <YoutubeEmbed placeholder={VideoImage} embedId="iD7iYTeE2kI" />
          </div>
        </div>
      </Header>

      <div className="mt-[120px] md:mt-[300px]">
        <Section>
          <div className="md:grid grid-cols-2 gap-24">
            <div className="mb-8">
              <Heading>{whatIsNuts.meta["title"]}</Heading>
              <Markdown className="prose font-inter space-y-6 leading-loose" html={whatIsNuts.content} />
            </div>

            <div>
              <Video src="/no_fax.mp4" />
            </div>
          </div>
        </Section>
      </div>

      <div className="bg-light mt-[40px]">
        <Section>
          <div className="md:grid grid-cols-2 gap-24 items-center">
            <div className="text-right">
              <img src="/globe.gif" loading="lazy" />
            </div>
            <div>
              <Heading>{howDoesItWork.meta["title"]}</Heading>
              <Markdown className="prose font-inter space-y-6 leading-loose" html={howDoesItWork.content} />
            </div>
          </div>
        </Section>
      </div>

      <Section>
        <Heading>{community.meta["title"]}</Heading>
        <Markdown className="font-inter" html={community.content} />
      </Section>

      <div className="mb-36 h-[65px]">
        <Carousel items={config.participants.map(participant => (<a
          href={participant.url}
          key={participant.title}
          target="_blank"
          rel="noreferrer">
          <img
            src={participant.logoUrl}
            loading="lazy"
            className="h-full object-cover"
          />
        </a>))} />
      </div>

      {/* <div className="bg-light">
        <Section>
          <div className="md:grid grid-cols-2 gap-10">
            <div></div>
            <div>
              <Heading>{usecases.meta["title"]}</Heading>
              <Markdown className="font-inter mb-24" html={usecases.content} />
            </div>
          </div>

          <div className="md:grid grid-cols-4 gap-10">
            <UseCase
              slug="community"
              title="Nuts Community"
              blurb="Hoe hebben we onszelf georganiseerd? Wanneer zijn de belangrijkste meetings? Welke afspraken liggen er?"
              color="#799938"
              images={{
                small: ZorgInzageSm,
                large: ZorgInzage,
              }}
            />

            <UseCase
              slug="node"
              title="De functies van het Nuts netwerk"
              blurb="Alles over de generieke functies die de vertrouwenslaag van Nuts biedt: Autorisatie, authenticatie, logging en register."
              color="#245371"
              images={{
                small: eOverdrachtSm,
                large: eOverdracht,
              }}
            />

            <UseCase
              slug="babyconnect"
              title="Integrale samenwerking"
              blurb="Hoe Nuts de zorg helpt met het oplossen van praktische vraagstukken in digitale samenwerking."
              color="#D15949"
              images={{
                small: BabyConnectSm,
                large: BabyConnect,
              }}
            />

            <UseCase
              slug="kik-v"
              title="Secundair datagebruik"
              blurb="Hoe Nuts het mogelijk maakt om veilig en met respect voor de privacy van de patiënt data beschikbaar te stellen voor onderzoek."
              color="#3A9DD8"
              images={{
                small: KikVSm,
                large: KikV,
              }}
            />
          </div>
        </Section>
      </div> */}

      <Section>
        <div className="mx-auto text-center max-w-lg">
          <div>
            <Heading>{callToAction.meta["title"]}</Heading>
            <Markdown className="font-inter leading-loose mb-8" html={callToAction.content} />

            <form action="https://nuts.us19.list-manage.com/subscribe/post?u=3e7256ff066373fd17657bba0&id=f44bdb4b26" method="POST">
              <InputButton inputName="EMAIL" placeholderText="Vul hier je e-mailadres in" buttonText="Houd me op de hoogte!" buttonType="submit" />
            </form>
          </div>
        </div>
      </Section>

    </Layout>
  )
}

export const getStaticProps = async () => {
  const files = await readdir("public/logos")

  return {
    props: {
      sections: {
        entrance: await getContent("home/1-entrance"),
        whatIsNuts: await getContent("home/2-what-is-nuts"),
        howDoesItWork: await getContent("home/3-how-does-it-work"),
        community: await getContent("home/4-community"),
        usecases: await getContent("home/5-usecases"),
        callToAction: await getContent("home/6-bottom-call-to-action"),
      },
    }
  }
}
