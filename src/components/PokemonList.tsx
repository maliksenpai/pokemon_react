import {useStore} from "../helpers/use-store";
import {Key, useEffect, useRef, useState} from "react";
import {Card, CircularProgress, Container, Grid, CardContent, Typography} from "@mui/material";
import {useObserver} from "mobx-react-lite";
import '../style/PokemonStyle.scss';

export const PokemonList = () => {

    const pokemonStore = useStore();
    const listRef = useRef<HTMLHeadingElement>(null);
    const [fadeAnimation, setFadeAnimation] = useState<boolean>(false);
    const [selectedPokemon, setSelectedPokemon] = useState<Number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            // @ts-ignore
            const bottom = (listRef.current?.getBoundingClientRect().bottom) <= (window.innerHeight) * 1.05;
            // @ts-ignore
            if (bottom && !loading) {
                setLoading(true);
            }
        });
        pokemonStore.addPokemonList();
    }, []);

    useEffect(() => {
        if (loading) {
            pokemonStore.addPokemonList().then(() => {
                setLoading(false);
            });
        }
    }, [loading])

    const handleSelect = (pokemon : Number) => {
        setSelectedPokemon(pokemon);
        setFadeAnimation(true);
    }

    const handleFinishAnimation = () => {
        pokemonStore.selectPokemon(selectedPokemon as Number);
        setFadeAnimation(false);
    }

    return useObserver(() => {
        return (
            <Container>
                {
                    pokemonStore.loading ?
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
                        </Grid> : null
                }
                <Grid
                    ref={listRef}
                    container
                    justifyContent="center"
                    gap={1}
                    columns={13}
                    className={`pokemonList ${fadeAnimation ? 'fadeOut' : ''}`}
                    onAnimationEnd={() => handleFinishAnimation()}
                    style={{ minHeight: '100vh' }}
                >
                    {
                        pokemonStore.pokemonArray.map((pokemon) => {
                            return <Grid item sm={6} md={4} key={pokemon.id as Key} pt={2}>
                                <Card sx={{ textAlign: 'center', backgroundColor: pokemon.color.toString() }} elevation={8} className="pokemonCard" onClick={() => handleSelect(pokemon.id)}>
                                    <CardContent>
                                        <Typography className="pokemonCardName" variant={"h5"}>
                                            {pokemon.name}
                                        </Typography>
                                        <Typography variant={"h6"}>
                                            Generation: <b> {pokemon.generation} </b>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        })
                    }
                </Grid>
                {
                    loading && <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ marginBlock: "50px" }}
                    >
                        <Grid item>
                            <CircularProgress />
                        </Grid>
                    </Grid>
                }
            </Container>

        )
    });
}