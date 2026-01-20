import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Tailwind,
    Hr,
    Link,
    Column,
    Row,
} from "@react-email/components";
import * as React from "react";

// 1. DEFINE CONTENT FOR EACH ROLE
const contentMap = {
    venture_owner: {
        preview: "Grow your venture in public on Mivro.",
        headline: "Welcome to Mivro for Ventures",
        intro: "If you’re building a startup, a brand, or a side project, we know how hard it is to get noticed. Word of mouth can only go so far, and advertising is a pain to handle. Mivro is built to change that.",
        bullets: [
            "Share updates and launches (from homemade products to tech startups)",
            "Get in touch with other ventures to easily collaborate",
            "Reach students who are interested in what you have to offer"
        ],
        outro: "Think of Mivro as your campus homepage, where what you’re building can grow in public."
    },
    club_owner: {
        preview: "The new home for your club on campus.",
        headline: "Welcome to Mivro for Organizations",
        intro: "Running a club means balancing meetings, events, and recruiting new members while trying to stay visible on campus at the same time. Mivro gives your club one place to:",
        bullets: [
            "Share announcements and events",
            "Reach students from all over campus, where you can assign a journalist for your club",
            "Give prospective members an idea of how your club functions"
        ],
        outro: "No more relying on club directories to be seen. Clubs on Mivro become part of a larger campus feed, where students actively go to discover what’s happening."
    },
    regular: {
        preview: "Discover the campus you didn't know existed.",
        headline: "Welcome to Mivro",
        intro: "On campus, there are many opportunities to explore that are often overlooked. Mivro brings it all together. Here, you can:",
        bullets: [
            "Discover clubs, ventures, and events you didn’t know existed",
            "Stay updated in real time with publications by on-campus journalists",
            "Follow what matters to you"
        ],
        outro: "Jump in, explore the feed, and follow a few communities that catch your eye."
    },
    journalist: {
        preview: "Your stories, seen by the whole campus.",
        headline: "Welcome to Mivro News",
        intro: "If you care what happens on campus and are interested in stories, interviews, opinion pieces, or visuals, you know how hard it is to get work out there and seen. Mivro gives journalists a space to:",
        bullets: [
            "Publish and showcase their work",
            "Reach readers who care about campus stories",
            "Build a public portfolio over time"
        ],
        outro: "Whether you are an aspiring independent journalist or part of an organization, your work deserves to have an impact."
    }
};

type UserType = keyof typeof contentMap;

export const MivroWelcomeEmail = ({ userType = "regular" }: { userType: UserType }) => {
    // Fallback if an unknown user type is passed
    const content = contentMap[userType] || contentMap.regular;

    return (
        <Html>
            <Head />
            <Preview>{content.preview}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        {/* LOGO SECTION - Stylized Text as Logo */}
                        <Section className="mt-[32px] text-center">
                            <Row>
                                <Column>
                                    <Text className="text-3xl font-black tracking-tighter text-black m-0" style={{ lineHeight: 1 }}>
                                        Mivro
                                        <span style={{ color: '#c75b12', fontSize: '0.4em', verticalAlign: 'super', marginLeft: '2px' }}>●</span>
                                    </Text>
                                </Column>
                            </Row>
                        </Section>

                        <Heading className="text-black text-[24px] font-bold text-center p-0 my-[30px] mx-0">
                            {content.headline}
                        </Heading>

                        <Text className="text-black text-[14px] leading-[24px]">
                            {content.intro}
                        </Text>

                        <Section>
                            <ul className="text-black text-[14px] leading-[24px] pl-5 list-disc">
                                {content.bullets.map((bullet, i) => (
                                    <li key={i} className="mb-2">{bullet}</li>
                                ))}
                            </ul>
                        </Section>

                        <Text className="text-black text-[14px] leading-[24px]">
                            {content.outro}
                        </Text>

                        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

                        <Text className="text-[#666666] text-[12px] leading-[24px] text-center">
                            Questions? Follow and contact us at{" "}
                            <Link href="https://instagram.com/utd_mivro" className="text-[#c75b12] font-semibold no-underline">
                                @utd_mivro
                            </Link>
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default MivroWelcomeEmail;
