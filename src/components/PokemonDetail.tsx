import {Pokemon} from "../models/Pokemon";
import React, {useEffect, useState} from "react";
import {
    Accordion,
    AccordionDetails, AccordionSummary, Button,
    Card,
    CardMedia,
    CircularProgress,
    Container,
    Grid,
    Typography
} from "@mui/material";
import {GetPokemonFromId} from "../data/GetPokemonData";
import {ExpandMore, Image} from "@mui/icons-material";
import {PokemonFieldGeneral} from "../models/PokemonFieldGeneral";
import {ReactComponent} from "*.svg";
import {useStore} from "../helpers/use-store";

interface PokemonDetailProps {
    pokemon: Number,
}

export const PokemonDetail : React.FC<PokemonDetailProps> = (props: PokemonDetailProps) => {

    const pokemonStore = useStore();
    const [loading, setLoading] = useState<boolean>(true);
    const [fadeAnimation, setFadeAnimation] = useState<boolean>(false);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [readyToGet, setReadyToGet] = useState<boolean>(false);

    useEffect(() => {
        if (readyToGet) {
            GetPokemonFromId(props.pokemon).then((value => {
                setLoading(false);
                setSelectedPokemon(value);
            }));
        }
    }, [readyToGet]);

    const handleBackButton = () => {
        setFadeAnimation(true);
        setTimeout(() => {
            pokemonStore.selectPokemon(null);
        }, 1000);
    }

    return (
        <Container className={`pokemonDetail ${fadeAnimation ? 'fadeOut' : ''}`} onAnimationEnd={() => setReadyToGet(true)}>
            {
                loading ?
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: '100vh' }}
                    >
                        <Grid item>
                            <CircularProgress />
                        </Grid>
                    </Grid>
                    :
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        className={`pokemonDetail`}
                        pt={4}
                    >
                        <Grid item alignItems={"center"}>
                            <Grid display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                <Button onClick={handleBackButton} variant={"contained"}>
                                    Back
                                </Button>
                            </Grid>
                            <Card className={"pokemonDetailCard"} sx={{   backgroundImage: `linear-gradient(${selectedPokemon?.color}, white)` }} elevation={12}>
                                <img height={"200px"} src={selectedPokemon?.sprites?.front_default.toString()} alt={selectedPokemon?.name.toString()} />
                                <Typography className={"pokemonCardName"} textAlign={"center"} variant={"h4"}> {selectedPokemon?.name} </Typography>
                                <div>
                                    <Typography className={"pokemonCardName"} textAlign={"center"} variant={"h4"}> Base Stats </Typography>
                                    <div className={"pokemonDetailStatsDiv"}>
                                        <div className={"pokemonDetailStatsInnerDiv"}>
                                           <>
                                               <Typography variant={"h6"}> HP </Typography>
                                               {selectedPokemon?.base_stats?.hp}
                                           </>
                                        </div>
                                        <div className={"pokemonDetailStatsInnerDiv"}>
                                            <>
                                                <Typography variant={"h6"}> Defense </Typography>
                                                {selectedPokemon?.base_stats?.defense}
                                            </>
                                        </div>
                                        <div className={"pokemonDetailStatsInnerDiv"}>
                                            <>
                                                <Typography variant={"h6"}> Attack </Typography>
                                                {selectedPokemon?.base_stats?.attack}
                                            </>
                                        </div>
                                        <div className={"pokemonDetailStatsInnerDiv"}>
                                            <>
                                                <Typography variant={"h6"}> Speed </Typography>
                                                {selectedPokemon?.base_stats?.speed}
                                            </>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <Card className={"pokemonDetailCard"} elevation={12}>
                                <Typography className={"pokemonCardName"} textAlign={"center"} variant={"h4"}>
                                    Evolves
                                </Typography>
                                {
                                    selectedPokemon?.evolves_from && (
                                        <>
                                            <hr style={{ width: "90%" }} />
                                            <Typography className={"pokemonCardName"} textAlign={"center"} variant={"h6"}>
                                                Evolves From
                                            </Typography>
                                            {
                                                Array.isArray(selectedPokemon?.evolves_from) ? selectedPokemon?.evolves_from?.map((element) => {
                                                        return <Card>
                                                            <img height={"200px"} src={element?.sprites?.front_default.toString()} alt={element?.name as string} />
                                                            <Typography className={"pokemonCardName"} textAlign={"center"} variant={"body2"}> {element?.name} </Typography>
                                                        </Card>;
                                                    }) :
                                                    <Card>
                                                        <img height={"200px"} src={selectedPokemon?.evolves_from?.sprites?.front_default.toString()} alt={selectedPokemon?.evolves_from?.name as string} />
                                                        <Typography className={"pokemonCardName"} textAlign={"center"} variant={"body2"}> {selectedPokemon?.evolves_from?.name} </Typography>
                                                    </Card>
                                            }
                                        </>
                                    )
                                }
                                {
                                    selectedPokemon?.evolves_to && (
                                        <>
                                            <hr style={{ width: "90%" }} />
                                            <Typography className={"pokemonCardName"} textAlign={"center"} variant={"h6"}>
                                                Evolves To
                                            </Typography>
                                            {
                                                Array.isArray(selectedPokemon?.evolves_to) ? selectedPokemon?.evolves_to?.map((element) => {
                                                        return <Card>
                                                            <img height={"200px"} src={element?.sprites?.front_default.toString()} alt={element?.name as string} />
                                                            <Typography className={"pokemonCardName"} textAlign={"center"} variant={"body2"}> {element?.name} </Typography>
                                                        </Card>;
                                                    }) :
                                                    <Card>
                                                        <img height={"200px"} src={selectedPokemon?.evolves_to?.sprites?.front_default.toString()} alt={selectedPokemon?.evolves_to?.name as string} />
                                                        <Typography className={"pokemonCardName"} textAlign={"center"} variant={"body2"}> {selectedPokemon?.evolves_to?.name} </Typography>
                                                    </Card>
                                            }
                                        </>
                                    )
                                }
                            </Card>
                            <Card className={"pokemonDetailCard"}>
                                <Typography variant={"h4"}> Pokedex Description </Typography>
                                <div className={"pokedexDescriptionScroll"}>
                                    <ol>
                                        {
                                            selectedPokemon?.pokedex_entries?.map((element : PokemonFieldGeneral) => {
                                                return <li data-image={selectedPokemon?.color}>
                                                    {element?.description}
                                                </li>
                                            })
                                        }
                                    </ol>
                                </div>
                            </Card>
                            <Card className={"pokemonDetailCard"}>
                                <Typography className={"pokemonCardName"} textAlign={"center"} variant={"h4"} mb={3}> Abilities </Typography>
                                {
                                    selectedPokemon?.abilities?.map((element) =>
                                        <>
                                            <Typography variant={"h6"}>{element?.name}</Typography>
                                            <Accordion className={"pokemonDetailAccordion"}>
                                                <AccordionSummary className={"pokemonDetailAccordionSummary"} expandIcon={<ExpandMore />} sx={{ background: selectedPokemon?.color.toString() }}> {element?.description} </AccordionSummary>
                                                <AccordionDetails className={"pokemonDetailAccordionDetail"}> {element?.effect} </AccordionDetails>
                                            </Accordion>
                                            <hr style={{ width: "100%" }} />
                                        </>
                                    )
                                }
                            </Card>
                        </Grid>
                    </Grid>
            }
        </Container>
    );
}