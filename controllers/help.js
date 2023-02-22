import Help from "../models/Help.js";

export const createHelp = async (req, res, next) => {
    const newHelp = new Help(req.body);

    try {
        const savedHelp = await newHelp.save();
        // res.status(200).json(savedHelp);
        res.redirect("/");
    } catch (err) {
        next(err);
    }
};

export const updateHelp = async (req, res, next) => {
    try {
        const updatedHelp = await Help.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedHelp);
    } catch (err) {
        next(err);
    }
};

export const deleteHelp = async (req, res, next) => {
    try {
        await Help.findByIdAndDelete(req.params.id);
        res.status(200).json("Help has been deleted");
    } catch (err) {
        next(err);
    }
};

export const getHelp = async (req, res, next) => {
    try {
        const help = await Help.findById(req.params.id);
        res.status(200).json(help);
    } catch (err) {
        next(err);
    }
};

export const getHelps = async (req, res, next) => {
    try {
        const helps = await Help.find(req.params.id);
        res.status(200).json(helps);
    } catch (err) {
        next(err);
    }
};
